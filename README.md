# Introduction
This is a blog implemeneted as a Single Page Application with Django and React.

# How to Run
1. Creating a Python virtualenv, activate, then `pip install -r requirements.txt`;
2. Under the root folder (containing package.json), run `npm install`
3. Under the root folder (containing package.json), run 

`npm run dev` (dev mode, watching files) or

`npm run prod` (production mode, watching files) or

`npm run compile` (production mode, compile once)

You can find the actual command (dev, prod, compile) in `package.json`.

## Notes
1. Under dev mode, all the `process.env.NODE_ENV` inside compiled js files will be evaluated to be `true`, and the `debug` variable in `webpack.config.js` is true.

2. Vice versa under production mode.

3. Under dev mode, the REST base URL is "http://localhost:8000/", while under production mode, it is "http://www.liangruiwei.com/". This is defined in `src/js/constants.js`.

4. The `webpack.config.backup.js` is a backup config for webpack 1, and the using webpack.config.js files is for webpack 2.

5. Make sure you have the latest LTS Node installed (6.9.5 LTS), otherwise it might not support some webpack 2 loaders such as node-sass and sass-loader.

6. You might need to include a `passwords.py` and `production_settings.py` included in `src/trydjango19/settings`. You can check `src/trydjango19/settings/base.py` for more details


# Code
Backend and frontend communicate through RESTful apis and thus loosely coupled. To check React's code, go to "src/js/".

# Tech Stack
## Backend
Django, Djang-rest-framework

## Frontend
React, React-router, Redux, Redux-form, React-codemirror, Pure CSS, Webpack 2, SASS

# License
**MIT**
