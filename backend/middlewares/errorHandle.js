const errorHandle = (error, req, res, next) => {
  if (res.headersSent !== true) {
    const errMessage = error.statusCode ? error.message : 'Ошибка на серверe';
    res.status(error.statusCode || 500).send({ message: errMessage });
  }
  next();
};

module.exports = { errorHandle };
