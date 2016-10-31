from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import render, get_object_or_404

from .forms import CommentForm
from .models import Comment


# Create your views here.

@login_required
def comment_thread(request, id):

	comment = get_object_or_404(Comment, id=id)

	initial_data = {
			"content_type": comment.content_type,
			"object_id": comment.object_id
	}


	comment_form = CommentForm(request.POST or None, initial=initial_data)

	if comment_form.is_valid() and request.user.is_authenticated():
		c_content = comment_form.cleaned_data.get("content")	
		new_comment, created = Comment.objects.get_or_create(
								user = request.user,
								content_type = comment.content_type,
								object_id = comment.object_id,
								content = c_content,
								parent = comment,
								)
		return HttpResponseRedirect(comment.get_absolute_url())

	context = {
		"comment": comment,
		"form": comment_form,
	}

	return render(request, "comment_thread.html", context)

def delete(request, id):
	try:
		obj = Comment.objects.get(id=id)
	except:
		raise Http404

	if request.POST and request.user.is_authenticated():
		parent_url = obj.content_object.get_absolute_url()
		obj.delete()
		messages.success(request, "comment(s) has been deleted")
		
		return HttpResponseRedirect(parent_url)

	context = {
		"comment" : obj,
	}

	return render(request, "comment_delete.html", context)