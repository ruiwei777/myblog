from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse
from django.db import models
from django.db.models.signals import pre_save

from django.utils import timezone
from django.utils.safestring import mark_safe
from django.utils.text import slugify

from markdown_deux import markdown

from comments.models import Comment

from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

# Create your models here.

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())



def upload_location(instance, filename):
	return "%s/%s" % (instance.id, filename)

class PostManager(models.Manager):
	def active(self, *args, **kwargs):
		return super(PostManager, self).filter(draft=False, publish__lte=timezone.now().date())




class Post(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1)
	title = models.CharField(max_length=120)
	slug = models.SlugField(unique=True)
	image = models.ImageField(upload_to=upload_location, 
		null=True, 
		blank=True,
		height_field="height_field",
		width_field="width_field")
	height_field = models.IntegerField(default=0)
	width_field = models.IntegerField(default=0)
	content = models.TextField()
	draft = models.BooleanField(default=False)
	publish = models.DateField(auto_now=False, auto_now_add=False)
	updated = models.DateTimeField(auto_now=True, auto_now_add=False)
	timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)
	#override ModelManager
	objects = PostManager()

	class Meta:
		ordering = ('publish',)

	def __str__(self):
		return self.title

	def get_absolute_url(self):
		return reverse("posts:read", kwargs={"slug":self.slug})

	def get_update_url(self):
		return reverse("posts:update", kwargs={"slug": self.slug})

	def get_markdown(self):
		content = self.content
		return mark_safe(markdown(content))

	@property
	def comments(self):
		"return the post's comments"
		return Comment.objects.filter_by_instance(self)

	@property
	def get_content_type(self):
	    return ContentType.objects.get_for_model(self.__class__)
	
	
	
	

def create_slug(instance, new_slug=None):
	slug = slugify(instance.title)
	if new_slug is not None:
		slug = new_slug
		
	qs = Post.objects.filter(slug=slug).order_by("-id")
	exists = qs.exists()
	if exists:
		new_slug = "%s-%s" % (slug, qs.first().id)
		slug = create_slug(instance, new_slug=new_slug)
	return slug


def pre_save_post_receiver(sender, instance, raw, **kwargs):
	slug = create_slug(instance)
	instance.slug = slug
	# print("raw is", raw)
	# print("The sender class is", sender)
	# for key, value in kwargs.items():
	# 	print("Key",key, "value", value)





pre_save.connect(pre_save_post_receiver, sender=Post)