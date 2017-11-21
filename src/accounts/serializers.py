from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        extra_kwargs = {
            'date_joined': {'read_only': True},
            'email': {
                'required': True,
                'allow_blank': False
            },
            'is_staff': {'read_only': True},
            'is_superuser': {'read_only': True},
            'last_login': {'read_only': True},
            'password': {'write_only': True},

        }
        fields = '__all__'
        model = User


# extra_kiwargs is wrong, don't use it
# class UserCreateSerializer(UserSerializer):
#     class Meta:
#         extra_kwargs['password'] = {'write_only': True, 'required': True}


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')
