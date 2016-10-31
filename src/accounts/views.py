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
from django.shortcuts import render


from .forms import UserLoginForm, UserRegistrationForm

# Create your views here.

def login_view(request):
	title = "Login"
	form = UserLoginForm(request.POST or None)
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
		# print(form.cleaned_data)
		# print("user.password", user.password)
		user.set_password(form.cleaned_data.get("password"))
		user.save()
		# print("user.password", user.password)
		messages.success(request, "Register succeeded")

		new_user = authenticate(username=user.username, password=form.cleaned_data.get("password"))
		login(request, new_user)
		return HttpResponseRedirect(reverse("index"))

	context = {
		"title": title,
		"form": form
	}
	return render(request, "login_form.html", context)

def logout_view(request):
	
	logout(request)

	context = {
		
	}
	return render(request, "index.html", context)