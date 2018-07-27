
module.exports = {

  BadRequestError :function (error, response) {
    response.status(400).send(error);
  },

  ParamsMissing :function (error, response){
    response.status(422).send(error);
  },

  InvalidCredential : function(error , response){
    response.status(401).send(error);
  },

  InternalServerError : function(error, response){
    response.status(500).send(error);
  },

  FileNotFoundError : function(error, response){
    response.status(404).send(error);
  }

};
