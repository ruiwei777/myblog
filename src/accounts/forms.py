from django import forms

from django.contrib.auth import(
		authenticate,
		get_user_model,
		login,
		logout,
	)
from django.contrib.auth.models import User
# from django.contrib.auth.models import User


# User = get_user_model()

class UserLoginForm(forms.Form):
	username = forms.CharField()
	password = forms.CharField(widget=forms.PasswordInput)

class UserRegistrationForm(forms.ModelForm):
	#Overriding the model fields
	email2 = forms.EmailField(label="Confirm Email")
	password = forms.CharField(widget=forms.PasswordInput)

	class Meta:
		model = User
		fields = [
			'username',
			'password',
			'email',
			'email2',
		]

	def clean_email2(self):
		
		email2 = self.cleaned_data.get("email2")
		email = self.cleaned_data.get("email")
		if email != email2:
			raise forms.ValidationError("Email must match")
		email_qs = User.objects.filter(email=email)
		if email_qs.exists():
			raise forms.ValidationError("This email has already been registered")

		return email2