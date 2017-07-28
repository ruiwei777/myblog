from .models import Post
from rest_framework import serializers
from accounts.serializers import UserSerializer


class PostSerializer(serializers.HyperlinkedModelSerializer):

    # user = UserSerializer()
    id = serializers.ReadOnlyField()
    slug = serializers.ReadOnlyField()
    username = serializers.ReadOnlyField(source="user.username")
    height_field = serializers.ReadOnlyField()
    width_field = serializers.ReadOnlyField()

    class Meta:
        model = Post
        # fields = ('user', 'title', 'slug', 'publish') # can customize fields here
        fields = '__all__'



