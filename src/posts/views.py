from django.conf import settings
from django.db.models import Q
from django.shortcuts import render
from django.http import HttpResponseRedirect, Http404

from .models import Post

# rest_framework: viewsets
from rest_framework import viewsets
from .serializers import PostSerializer

# rest_framework: class-based views
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import logging
from datetime import datetime


def home(request):
    """
    index page for `posts`: www.domain.com/posts/
    """
    return render(request, "post_home.html", {})


def index(request):
    """
    index page for the whole website: www.domain.com
    """
    return render(request, "index.html", {})


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows posts to be viewed or edited.
    http://www.django-rest-framework.org/api-guide/viewsets/
    """
    queryset = Post.objects.all().order_by('-publish').filter(publish__lte=datetime.today())
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        # user cannot be an AnonymousUser obj otherwise it will raise an error
        # serializer.save(user=self.request.user)
        # print(self.request.user)
        if self.request.user.is_authenticated():
            serializer.save(user=self.request.user)
        else:
            serializer.save()
        
        # log the ip address if non-staff trying to create a post
        if not self.request.user.is_staff:
            logging.basicConfig(filename="post_creation.log", level=logging.INFO)
            ip = self.request.META["REMOTE_ADDR"]

            # Webfaction fix to see the real IP address
            if not settings.DEBUG:
                ip = self.request.META['HTTP_X_FORWARDED_FOR'].split(",")[0].strip()
            logging.info(str(datetime.now())+" Non-staff post writer from "+ str(ip))
