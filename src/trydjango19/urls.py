"""The root URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from posts import views as post_views
from accounts import views as account_views

from rest_framework.authtoken import views as authtoken_views
from rest_framework import routers

# rest_framework ViewSet
router = routers.DefaultRouter()
# domain.com/api/users/ , relative to api root
router.register(r'users', account_views.UserViewSet)
router.register(r'groups', account_views.GroupViewSet)
router.register(r'posts', post_views.PostViewSet)


urlpatterns = [
    url(r'^accounts.*', account_views.home),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),    # This is api root
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^comments/', include('comments.urls', namespace='comments')),
    url(r'^posts/', include('posts.urls', namespace='posts')),
    url(r'^$', post_views.index, name="index"),
]

# DRF TokenAuthentication setting
urlpatterns += [
    url(r'^api-token-auth/', authtoken_views.obtain_auth_token)
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
