"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// em uma aplicação real não faz sentido listar os usuários
// pois acaba virando uma falha de segurança, porém vou
// manter para exemplo.
router.get('/', _loginRequired2.default, _UserController2.default.index);
router.get('/:id', _UserController2.default.show);

// rota comentada apenas para cadastros internos (como já criei um cadastro eu tenho acesso)
// router.post('/', userController.create);
// retirei o id do PUT para que o usuario não possa alterar
// os dados de outro usuario, somente o dele.
// router.put('/:id', loginRequired, userController.update);
// router.delete('/:id', loginRequired, userController.delete);

router.put('/:id', _loginRequired2.default, _UserController2.default.update);
router.delete('/:id', _loginRequired2.default, _UserController2.default.delete);

// pense sempre sobre a regra de negócio quando estiver
// montando esse tipo de chamada (O que o usuário pode
// fazer? O que ele não pode fazer?)
// mas digamos que temos um nivel de autorização maior
// a qual um tipo de usuario possa excluir outros.
// Também pode acontecer.

exports. default = router;
/*
  index -> lista todos usuarios -> GET
  store/create -> cria um novo usuario -> POST
  delete -> apaga um usuario -> DELETE
  show -> mostra um usuario-> GET
  update -> atualiza um usuario -> PATCH ou PUT
*/
