from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse
from django.db import models


# Create your models here.

class CommentManager(models.Manager):
	def filter_by_instance(self, instance):
		"Fetch all the instance's non-reply comments"
		content_type = ContentType.objects.get_for_model(instance.__class__)
		object_id = instance.id
		return super(CommentManager, self).filter(content_type=content_type, object_id=object_id, parent=None)


class Comment(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1) 

	content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id = models.PositiveIntegerField()
	content_object = GenericForeignKey('content_type', 'object_id')

	parent = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True)
	content = models.TextField()
	timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)

	objects = CommentManager()

	class Meta:
		ordering = ["-timestamp"]

	def __str__(self):
		return str(self.content)

	def get_absolute_url(self):
		return reverse("comments:comment_thread", kwargs={"id": self.id})

	def get_delete_url(self):
		return reverse("comments:delete", kwargs={"id": self.id})


	@property
	def children(self):
		return Comment.objects.filter(parent=self)

	@property
	def is_parent(self):
		if self.parent is not None:
			return true
		return false