module.exports.getToken = async => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJBZG1pbmlzdHJhZG9yIl0sInVzZXJuYW1lIjoiYWRtaW5AYmluaXQuY29tLmFyIiwiaWF0IjoxNTYyMDY4NTIzLCJleHAiOjE1NjIwOTczMjN9.k4xQNTPzmekJ_JD11_ZXbd0cgklIDvL-YzgFaGudcQI";
};

module.exports.getHerokuEndpoint = async => {
  return "como-voto.herokuapp.com";
};

module.exports.getLocalEndpoint = async => {
  console.log("environment variable", process.env.REACT_APP_BACKEND_ENDPOINT)
  if(process.env.NODE_ENV === "development") return "http://localhost:8080";
  return "como-voto.herokuapp.com";
  //return "localhost:8080";
  //return "localhost:5000";
};
