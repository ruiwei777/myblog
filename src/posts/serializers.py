from .models import Post
from rest_framework import serializers
from accounts.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):

    publish = serializers.DateField(format="%d %b %Y", input_formats=["%Y-%m-%d"])
    user = UserSerializer(read_only=True)
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = Post
        exclude = ( 'height_field', 'width_field')
