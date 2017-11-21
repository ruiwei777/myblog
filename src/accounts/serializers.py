from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """
    Generic UserSerializer for the update, partial_update, list and retrieve.
    Exclude `password`, we have a `UserPasswordSerializer` for changing password;
    and a `UserCreateSerializer` for create user with password.

    email and username are read_only,
    we can use another Serializer to allow changing email in the future
    """
    class Meta:
        extra_kwargs = {
            'date_joined': {'read_only': True},
            'email': {'read_only': True},
            'first_name': {'required': True},
            'group': {'read_only': True},
            'is_staff': {'read_only': True},
            'is_superuser': {'read_only': True},
            'last_login': {'read_only': True},
            'last_name': {'required': True},
            'user_permissions': {'read_only': True},
            'username': {'read_only': True},
        }
        exclude = ('password',)
        model = User

    # Overriding, to set password correctly
    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # all fields are required
        fields = ('username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'email': {
                'required': True,
                'allow_blank': False
            },
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

# TODO: Serializer for changing password
# class UserPasswordSerializer(serializers.Serializer):
    # password = serializer.CharField(max_length=128, write_only=True, required=True)
    # old_password = serializer.CharField(max_length=128, write_only=True, required=True)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')
