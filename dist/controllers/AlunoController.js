"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await _Aluno2.default.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['id', 'filename'],
        },
      });
      res.json(alunos);
    } catch (e) {
      console.log(e);
    }
  }

  async create(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);
      const {
        id, nome, email, peso, altura,
      } = aluno;
      return res.json({
        id, nome, email, peso, altura,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async search(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['id', 'filename'],
        },
      });
      if (!aluno) {
        return res.status(404).json({
          errors: ['Aluno não existe'],
        });
      }
      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(404).json({
          errors: ['Aluno não existe'],
        });
      }
      const alunoAtualizado = await aluno.update(req.body);
      const {
        nome, sobrenome, email, idade, peso, altura,
      } = alunoAtualizado;
      return res.json({
        id, nome, sobrenome, email, idade, peso, altura,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(404).json({
          errors: ['Aluno não existe'],
        });
      }
      await aluno.destroy(id);
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new AlunoController();

/* const novoAluno = await Aluno.create({
  nome: 'Diego',
  sobrenome: 'Lepamar',
  email: 'diegolar25@outlook.com',
  idade: 30,
  peso: 76,
  altura: 1.72,
}); */
