import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    res.json('home_index');
  }
}

export default new HomeController();
