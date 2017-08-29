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
from posts import views
from accounts.views import(
        login_view,
        logout_view,
        register_view,
        UserViewSet,
        GroupViewSet
    )

from rest_framework.authtoken import views as authtoken_views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

import posts
import accounts

# rest_framework ViewSet
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)  # domain.com/api/users/ , relative to api root
router.register(r'groups', GroupViewSet)
router.register(r'posts', posts.views.PostViewSet)



urlpatterns = [
    url(r'^api/', include(router.urls)),    # This is api root
    url(r'^login/', login_view, name="login"),
    url(r'^logout/', logout_view, name="logout"),
    url(r'^register/', register_view, name="register"),
    url(r'^admin/', admin.site.urls),
    url(r'^posts/', include('posts.urls', namespace='posts')),
    url(r'^comments/', include('comments.urls', namespace='comments')),
    url(r'^sms/', include('sms.urls', namespace='sms')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^$', views.index, name="index"), 
]

# DRF TokenAuthentication setting
urlpatterns += [
    url(r'^api-token-auth/', authtoken_views.obtain_auth_token)
]



if settings.DEBUG:
	urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

