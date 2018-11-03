# Introduction
This is my [personal website](http://18.217.100.253/) with an SPA blog.

It uses Django, Django-Rest-Framework, React-Redux with thunk and Webpack 3. 

## How to run
Django setup
1. activate virtualenv
2. `pip install -r requirements.txt`
3. cd into `trydjango19/settings`, 

`cp local_settings_default.py local_settings.py`

4. database setup (see below)
5. `python src/manage.py migrate`

Webpack setup _Make sure Node.js 8.9.1+ is installed._

6. `npm install`
7. `npm run dev` (for production, `npm run build`)

Finally, after activating virtualenv

8. `python src/manage.py runserver`


## Database setup
1. install mysql 5.7
2. `mysql -uroot -p` to log into mysql as root, run

`CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';`

`CREATE DATABASE schemaname;`

`GRANT ALL ON schemaname.* TO 'username'@'localhost';`

Customize the above *username*, *password*, *schemaname*, and put corresponding values into `local_settings.py`

## production
Customize everything in `settings/local_settings.py`, especially set `DEBUG` to `False`. Then

`npm run build`

`python src/manage.py collectstatic`

Finally restart server like Apache.


# License
MIT
