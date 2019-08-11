from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.files import File
from django.core.urlresolvers import reverse
from django.db import models
from django.db.models.signals import pre_save
from django.db.models.signals import post_save

from django.utils import timezone
from django.utils.safestring import mark_safe
from django.utils.text import slugify

from comments.models import Comment
import os
import logging

from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

# Create your models here.

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())


def upload_location(instance, filename):
    id = "temp"
    if instance.id:
        id = instance.id
    return "%s/%s" % (id, filename)


class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=120)
    slug = models.SlugField(allow_unicode=True)  # default max_length=50
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

    class Meta:
        ordering = ('publish',)

    def __str__(self):
        return str(self.id) + ": " + self.title

    def get_absolute_url(self):
        return reverse("posts:read", kwargs={"slug": self.slug})

    def get_update_url(self):
        return reverse("posts:update", kwargs={"slug": self.slug})

    @property
    def comments(self):
        "return the post's comments"
        return Comment.objects.filter_by_instance(self)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)


def post_save_update_image_url(sender, instance, created, **kwargs):
    """ 
    Move the image from "MEDIA_ROOT/temp/" to "MEDIA_ROOT/posts/instance.id/".
    Make sure to check the "created" flag to avoid infinite loop!
    """

    if not instance.image or not created:
        return

    ROOT = os.path.dirname(os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))))

    MEDIA_ROOT = settings.MEDIA_ROOT

    new_img_relative_path = "posts/" + instance.image.name.replace("temp", str(instance.id))

    img_abs_path = os.path.join(MEDIA_ROOT, instance.image.name)
    new_img_abs_path = os.path.join(MEDIA_ROOT, new_img_relative_path)
    new_img_dir = os.path.join(MEDIA_ROOT, "posts/" + str(instance.id))

    # os.rename requires the target folder to exist
    if not os.path.exists(new_img_dir):
        os.makedirs(new_img_dir)

    os.rename(img_abs_path, new_img_abs_path)
    instance.image = new_img_relative_path
    instance.save()


post_save.connect(post_save_update_image_url, sender=Post)
