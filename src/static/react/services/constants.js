const DEBUG = process.env.NODE_ENV === 'production' ? false : true;

const API_ROOT = DEBUG ? "http://localhost:8000/" : "http://www.liangruiwei.com/";

export { DEBUG, API_ROOT };
