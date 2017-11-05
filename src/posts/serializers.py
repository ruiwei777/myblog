from .models import Post
from rest_framework import serializers
from accounts.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):

    publish = serializers.DateField(format="%d %b %Y", input_formats=["%Y-%m-%d"])
    user = UserSerializer(read_only=True)

    class Meta:
        model = Post
        # These commemts are just for reference, they are useless
        # fields = ('user', 'title', 'slug', 'publish') # can customize fields here
        # fields = '__all__'

        # When using `exclude`, cannot use `fields`
        exclude = ( 'height_field', 'width_field')
