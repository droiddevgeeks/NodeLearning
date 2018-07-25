
module.export = {

  BadRequestError :function (error, response) => {
    response.status(400).send(error);
  },

  InternalServerError : function(error, response) => {
    response.status(500).send(error);
  },

  FileNotFoundError = function(error, response) => {
    response.status(404).send(error);
  }

};
