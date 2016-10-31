from django.conf.urls import url
from . import views


urlpatterns = [
    
    url(r'^$', views.home, name='home'),
    url(r'^create/$', views.create, name='create'),
    url(r'^(?P<slug>[\w.@+-]+)/$', views.read, name='read'),
    url(r'^(?P<slug>[\w.@+-]+)/update/$', views.update, name='update'),
    url(r'^(?P<slug>[\w.@+-]+)/delete/$', views.delete, name='delete'),
]