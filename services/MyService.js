
class MyService{
  servePost(field, value) {
    return {field, value};
  }

  serveGet(id) {
    return id;
  }
}
  
module.exports = MyService;