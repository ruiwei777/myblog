"""
Local settings of the project.
Rename this file to local_settings.py and it will override base.py.

"""

import os

DEBUG = False

ALLOWED_HOSTS = []  # Server's DNS

SECRET_KEY = 'Put your own secret key here'

DB_SCHEMA = ''
DB_USERNAME = ''
DB_PASSWORD = ''

# Database settings
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': DB_SCHEMA,
        'USER': DB_USERNAME,
        'PASSWORD': DB_PASSWORD,
    }
}
