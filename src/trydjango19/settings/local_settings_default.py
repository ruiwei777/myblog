"""
Local settings of the project.
Rename this file to local_settings.py and variables here will override base.py.
"""

import os

DEBUG = True

ALLOWED_HOSTS = ['*']  # Server's DNS

SECRET_KEY = 'Put your own secret key here'

# Database settings
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'DB_SCHEMA_NAME',
        'USER': 'DB_USER_NAME',
        'PASSWORD': 'DB_PASSWORD',
    }
}
