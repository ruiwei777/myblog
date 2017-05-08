# Introduction
This is a responsive blog implemeneted as a Single Page Application with Django, React and Webpack 2.
See Demo on http://www.liangruiwei.com.

## Key Features
1. The [Blog](http://www.liangruiwei.com/posts) uses Django-Rest-Framework to service RESTful service and React-Redux to implement the SPA blog

2. Uses vanilla CSS to layout; Responsive design

3. Uses React-Codemirror to support rich format text content.


# How to Run
1. Routine Django set up, including activate virtualenv, install Python dependencies from `requirements.txt`, collect static files, make migrations, etc. If you don't want to modify React.js' code, that's it! otherwise:

2. Under the root folder (containing package.json), run `npm install`, then run
    `npm run dev` (dev mode, watching files) or
  
    `npm run prod` (production mode, watching files) or

    `npm run compile` (production mode, compile once)

    to re-compile javaScript files. You can find the actual command (dev, prod, compile) in `package.json`.

# Notes
1. Under Webpack 2 `dev` mode, all the `process.env.NODE_ENV` inside compiled js files, and the `debug` variable in `webpack.config.js` will be evaluated to `true`; vice versa under production mode.
    Under dev mode, the REST base URL is "http://localhost:8000/", while under production mode, it is "http://www.liangruiwei.com/". This is defined in `src/js/constants.js`.

2. The `webpack.config.backup.js` is a backup config for webpack 1, and the using `webpack.config.js` files is for webpack 2.

3. Make sure you have the latest LTS Node installed (6.9.5 LTS)

4. You need to include a `passwords.py` under `src/trydjango19/settings/`, and assign values to `MY_SECRET_KEY`([Django Secret Key Generator](http://www.miniwebtool.com/django-secret-key-generator/)), `DB_PASSWORD`, `MY_TWILIO_ACCOUNT_SID` and `MY_TWILIO_AUTH_TOKEN` inside it (some dummy values would suffice). Check `src/trydjango19/settings/base.py` for more details. 


# Tech Stack
## Backend
Django, Djang-rest-framework

## Frontend
React, React-router, Redux, Redux-form, React-codemirror, Pure CSS, Webpack 2, SASS

# Todo
1. add feedback animation after submitting a creating post form.

# License
**MIT**
