const toError = (error: Error | any) => {
  if (error.response) {
    return new Error(error.response.data.message);
  } else {
    return new Error(error.message);
  }
};

export default toError;
