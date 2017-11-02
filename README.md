# Introduction
This is my [personal website](http://www.liangruiwei.com) with an SPA blog.

It uses Django, Django-Rest-Framework, React-Redux with thunk and Webpack 3. 


# How to Run
1. Routine Django set up, including activate virtualenv, install Python dependencies from `requirements.txt`, collect static files, make migrations, etc. 

2. If you want to modify React's code,

    `npm install`, then

    `npm run dev` (dev mode, watching) or

    `npm run build` (production mode, compile once)

# Notes
1. Dev mode and production mode have different environmental variables such as `API_ROOT` and webpack plugins.

2. You need to include a `passwords.py` under `src/trydjango19/settings/`, and assign values to `MY_SECRET_KEY`([Django Secret Key Generator](http://www.miniwebtool.com/django-secret-key-generator/)), `DB_PASSWORD`, `MY_TWILIO_ACCOUNT_SID` and `MY_TWILIO_AUTH_TOKEN` inside it (some dummy values would suffice). Check `src/trydjango19/settings/base.py` for more details. 



# License
MIT
