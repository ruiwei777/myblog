# Introduction
This is a blog implemeneted as a Single Page Application with Django and React.

# How to Run
1. Creating a Python virtualenv, activate, then `pip install -r requirements.txt`;
2. Under the root folder (containing package.json), run `npm install`
3. Under the root folder (containing package.json), run
`npm run dev` (dev mode, watching files) or
`npm run prod` (production mode, watching files) or
`npm run compile` (production mode, compile once)
You can find the actual command (dev, prod, compile) in package.json.


# Code
Backend and frontend communicate through RESTful apis and thus loosely coupled. To check React's code, go to "src/js/".

# Tech Stack
## Backend
Django, Djang-rest-framework

## Frontend
React, React-router, Redux, Redux-form, React-codemirror, Pure CSS, Webpack 2, SASS
