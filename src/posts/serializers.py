from .models import Post
from rest_framework import serializers
from accounts.serializers import UserSerializer


class PostSerializer(serializers.HyperlinkedModelSerializer):

    # user = UserSerializer()
    id = serializers.ReadOnlyField()
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Post
        # fields = ('user', 'title', 'slug', 'publish')
        fields = '__all__'



