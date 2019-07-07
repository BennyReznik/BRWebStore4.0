import request from "request-promise";

const createHttpClient = () => {
  // a handy place to future defaults via reques.defaults
  return request;
};

export { createHttpClient };
