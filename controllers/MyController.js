const MyService = require('../services/MyService');

class MyController {
  constructor() {
    this.service = new MyService();
  }

  handlePost = async (req, res) => {
    try {
      const {field, value} = req.body;
      if (!field || !value) return res.status(400).send('very bad request');
      const result = this.service.servePost(field, value);
      res.status(200).json(result);      
    } catch (error) {
      console.error(error);
      res.status(500).send('internal server error');
    }
  }


  handleGet = async (req, res) => {
    try {
      const {id} = req.params;
      if (!id) return res.status(400).send('very bad request');
      const result = this.service.serveGet(parseInt(id));
      res.status(200).json(result);      
    } catch (error) {
      console.error(error);
      res.status(500).send('internal server error');
    }
  }
}

module.exports = MyController;