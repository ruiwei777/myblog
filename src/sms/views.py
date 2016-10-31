from django.conf import settings
from django.shortcuts import render

from twilio import TwilioRestException
from twilio.rest import TwilioRestClient


from .forms import SMSForm

# Create your views here.

def home(request):
	context = {}
	form = SMSForm(request.POST or None)
	phone_number=None
	phone_number_str=None

	if form.is_valid():
		phone_number = form.cleaned_data.get("phone_number")
		phone_number_str = str(phone_number)
		# twilio logic
		account_sid = settings.MY_TWILIO_ACCOUNT_SID
		auth_token  =  settings.MY_TWILIO_AUTH_TOKEN

		client = TwilioRestClient(account_sid, auth_token)

		try:
		    message = client.messages.create(body="Hi there, this is Ruiwei's message",
		        to="+61" + phone_number_str,    # Replace with your phone number
		        from_="+61437148573") # Replace with your Twilio number
		except TwilioRestException as e:
		    print(e)




	context = {
		"form": form,
		"phone_number": phone_number_str,
	}
	return render(request, "sms_home.html", context)