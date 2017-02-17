from urllib.parse import quote_plus

from django.contrib.contenttypes.models import ContentType
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.urlresolvers import reverse
from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect, Http404
from django.contrib import messages
from django.utils import timezone

from .models import Post
from .forms import PostForm

from comments.forms import CommentForm
from comments.models import Comment

#rest_framework: viewsets
from rest_framework import viewsets
from .serializers import PostSerializer

#rest_framework: class-based views
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

def home(request):
    

    if request.user.is_staff or request.user.is_superuser:
            queryset = Post.objects.all().order_by("-timestamp")
    else:
        queryset = Post.objects.active().order_by("-timestamp")

    q = request.GET.get("q")
    if q:
        queryset = queryset.filter(
            Q(title__icontains=q) |
            Q(content__icontains=q) |
            Q(user__first_name__icontains=q)|
            Q(user__last_name__icontains=q)).distinct()

    #Pagination
    paginator = Paginator(queryset, 7) # Show 10 contacts per page

    page = request.GET.get('page')
    try:
        post_list = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        post_list = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        post_list = paginator.page(paginator.num_pages)
    #End of Pagination

    today = timezone.now().date()

    context = {
        "queryset" : post_list,
        "today" : today,
    }

    return render(request, "post_home.html", context)

def create(request):
    if not request.user.is_staff and not request.user.is_superuser:
        context = {
            "message" : "403 Forbidden: Only authenticated users can create post."
        }
        
        return render(request, "error.html", context)

    form = PostForm(request.POST or None, request.FILES or None)

    if form.is_valid():
        instance = form.save(commit=False)
        instance.user = request.user
        instance.save()
        messages.success(request, "New post created.")
        return HttpResponseRedirect(instance.get_absolute_url())

    context = {
        "form" : form
    }

    return render(request, "create.html", context)

def read(request, slug=None):
    instance = get_object_or_404(Post, slug=slug)
    if instance.draft or instance.publish > timezone.now().date():
        if not request.user.is_staff and not request.user.is_superuser:
            raise Http404

    share_string = quote_plus(instance.content)


    comment_form = CommentForm(request.POST or None)
    if comment_form.is_valid():
        if not request.user.is_authenticated():
            return HttpResponseRedirect(reverse("login"))
        content = comment_form.cleaned_data.get("content")
        parent_obj = None
        try:
            parent_id = comment_form.cleaned_data.get("parent_id")
            parent_qs = Comment.objects.filter(id=parent_id)
            parent_obj = parent_qs.first()
        except:
            parent_id = None    
            
        new_comment = Comment(
                user = request.user,
                content = content,
                parent = parent_obj,
                content_object = instance,
            )
        new_comment.save()
        return HttpResponseRedirect(new_comment.content_object.get_absolute_url())




    context = {
        "instance" : instance,
        "share_string" : share_string,
        "comment_form" : comment_form,
        
    }

    return render(request, "read.html", context)

def update(request, slug=None):
    if not request.user.is_staff or not request.user.is_superuser:
        raise Http404

    instance = get_object_or_404(Post, slug=slug)
    form = PostForm(request.POST or None, request.FILES or None, instance=instance)

    if form.is_valid():
        instance = form.save(commit=False)
        instance.save()
        return HttpResponseRedirect(instance.get_absolute_url())

    context={
        "form" : form
    }

    return render(request, "create.html", context)


def delete(request, slug=None):
    if not request.user.is_staff or not request.user.is_superuser:
        raise Http404

    instance = get_object_or_404(Post, slug=slug)
    instance.delete()
    messages.success(request, "delete success.")

    queryset = Post.objects.all()
    context={
        "queryset" : queryset,
        
    }

    return render(request, "index.html", context)

def index(request):

    context = {

    }
    return render(request, "index.html", context)


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Post.objects.all().order_by('-publish')
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# Non viewset
# This is not in use, just for reference purpose
class PostList(APIView):
  """
  List all posts, or create a new post.
  """
  def get(self, request, format=None):
      posts = Post.objects.all()
      serializer = PostSerializer(posts, many=True, context={'request': request})
      return Response(serializer.data)

  def post(self, request, format=None):
      serializer = PostSerializer(data=request.data)
      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetail(APIView):
    """
    Retrieve, update or delete a post instance.
    """
    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)