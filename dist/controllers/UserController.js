"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async create(req, res) {
    try {
      const novoUser = await _User2.default.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      // usando atributes para trazer poucos dados, sem HASH de senha por exemplo.
      const users = await _User2.default.findAll({ attributes: ['id', 'nome', 'email'] });
      // console.log(req.userId, req.userEmail);
      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await _User2.default.findByPk(id, { attributes: ['id', 'nome'] });
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe'],
        });
      }
      const dadosUpdate = await user.update(req.body);
      const { id, nome, email } = dadosUpdate;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe'],
        });
      }
      await user.destroy();
      return res.json({
        msg: 'Usuário excluido',
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new UserController();
