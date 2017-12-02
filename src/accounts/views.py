from django.shortcuts import render

from .serializers import UserSerializer, UserCreateSerializer, GroupSerializer

from django.contrib.auth.models import User, Group

from rest_condition import Or, And

# rest_framework import
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView

from permissions import WriteOnly
from .permissions import IsOwnAllowAny


def home(request):
    """
    index page for `posts`: www.domain.com/accounts/
    """
    return render(request, "account_home.html", {})


class UserLoginView(ObtainAuthToken):
    # Overriding, add the user object into response
    # use this for POST /api-token-auth
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_data = UserSerializer(instance=user).data
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': user_data
        })


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [Or(WriteOnly, IsOwnAllowAny)]

    # Overriding
    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    # Overriding
    # use `UserCreateSerializer` because needs to response with `token`
    def create(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # prepare response data
        headers = self.get_success_headers(serializer.data)
        token = Token.objects.get(user=serializer.instance)
        user_data = UserSerializer(instance=serializer.instance).data
        data = {'user': user_data, 'token': token.key}
        data['token'] = token.key

        return Response(data, status=status.HTTP_201_CREATED,
                        headers=headers)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
