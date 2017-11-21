from django.contrib import messages
from django.contrib.auth import (
    authenticate,
    get_user_model,
    login,
    logout,
)
from django.core.urlresolvers import reverse
from django.forms import ValidationError
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect

from .forms import UserLoginForm, UserRegistrationForm
from .serializers import UserSerializer, UserCreateSerializer, GroupSerializer

from django.contrib.auth.models import User, Group

from rest_condition import Or, And

# rest_framework import
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from permissions import WriteOnly
from .permissions import IsOwnAllowAny


# Create your views here.

def login_view(request):

    title = "Login"
    data = request.POST.copy()
    print(data)
    form = UserLoginForm(request.POST or None)
    print(form)
    if form.is_valid():
        username = form.cleaned_data.get("username")
        password = form.cleaned_data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                url = request.GET.get("next")
                if url:
                    return HttpResponseRedirect(url)
                else:
                    return HttpResponseRedirect(reverse("index"))
            else:
                pass
        else:
            pass
    else:
        print("Error")

    context = {
        "form": form,
        "title": title,
    }
    return render(request, "login_form.html", context)


def register_view(request):
    title = "Register"

    form = UserRegistrationForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=False)
        user.set_password(form.cleaned_data.get("password"))
        user.save()
        messages.success(request, "Register succeeded")

        new_user = authenticate(username=user.username,
                                password=form.cleaned_data.get("password"))
        login(request, new_user)
        return HttpResponseRedirect(reverse("index"))

    context = {
        "title": title,
        "form": form
    }
    return render(request, "login_form.html", context)


def logout_view(request):
    logout(request)
    to = "/"
    next = request.GET.get("next")
    if next:
        to += next + "/"

    return redirect(to)


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
    # change serializer to `UserCreateSerializer` because of `token`
    def create(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token = Token.objects.get(user=serializer.instance)
        data = serializer.data
        data['token'] = token.key
        return Response(data, status=status.HTTP_201_CREATED,
                        headers=headers)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
