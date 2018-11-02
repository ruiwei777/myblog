# Introduction
This is my [personal website](http://18.217.100.253/) with an SPA blog.

It uses Django, Django-Rest-Framework, React-Redux with thunk and Webpack 3. 


# How to Run
First step is usual Django setup, such as activate virtualenv, `pip install -r requirements.txt`, make migrations, migrate, etc.

## development
This project takes the advantages of webpack-dev-server hot-module-reloading, but it comes at a price that all React modules are highly coupled with webpack-dev-server, so you must run **both** Django and webpack-dev-server to make **React modules** to work. Otherwise only server-side rendering pages will work (such as index page). To do that:

`npm install`, `npm run dev`, `python src/manage.py runserver`

## production
Routine Django production setup, such as setting `DEBUG` to `False`, config `ALLOWED_HOSTS`, etc. Then `npm run build`, `python src/manage.py collectstatic`; finally restart server like Apache.

# Notes
1. `(optional)` To customise your settings and secrets, see `__init__.py` and `passwords_default.py` in `src/trydjango19/settings`. 

# License
MIT
