from django.conf.urls import url
from . import views


urlpatterns = [
    
    # url(r'^$', views.home, name='home'),
    # url(r'^create/$', views.create, name='create'),
    url(r'^(?P<id>\d+)/$', views.comment_thread, name='comment_thread'),
    # url(r'^(?P<slug>[\w.@+-]+)/update/$', views.update, name='update'),
    url(r'^(?P<id>\d+)/delete/$', views.delete, name='delete'),
]