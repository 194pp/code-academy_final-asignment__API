
module.exports =  {
  successResp: (message, data) => {
    return {
      msg: message,
      data: data,
    };
  },
  errorResp: (error, data) => {
    return {
      err: error,
      data: data,
    };
  },
}
