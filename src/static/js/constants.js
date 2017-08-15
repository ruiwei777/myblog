const DEBUG = !process.env.NODE_ENV

const baseURL = DEBUG ? "http://localhost:8000/" : "http://www.liangruiwei.com/"

export { DEBUG, baseURL };
