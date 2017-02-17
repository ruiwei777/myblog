const debug = !process.env.NODE_ENV

const baseURL = debug ? "http://localhost:8000/" : "http://www.liangruiwei.com/"

export { baseURL };
