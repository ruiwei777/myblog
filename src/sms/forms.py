

from pagedown.widgets import PagedownWidget

from django import forms

class SMSForm(forms.Form):
	phone_number = forms.IntegerField(required=True)
	publish = forms.DateTimeField(required=True, widget=forms.SelectDateWidget)
	content = forms.CharField(required=True, widget=forms.Textarea)
	