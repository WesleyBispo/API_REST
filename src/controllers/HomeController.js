class HomeController {
  index(req, res) {
    res.status(200).json({
      menssage: 'Hello world',
    });
  }
}

export default new HomeController();
