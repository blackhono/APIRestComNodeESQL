import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Diego',
      sobrenome: 'Lepamar',
      email: 'diegolar25@outlook.com',
      idade: 30,
      peso: 76,
      altura: 1.72,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
