import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// em uma aplicação real não faz sentido listar os usuários
// pois acaba virando uma falha de segurança, porém vou
// manter para exemplo.
router.get('/', loginRequired, userController.index);
router.get('/:id', userController.show);

router.post('/', userController.create);
// retirei o id do PUT para que o usuario não possa alterar
// os dados de outro usuario, somente o dele.
// router.put('/:id', loginRequired, userController.update);
// router.delete('/:id', loginRequired, userController.delete);

router.put('/:id', loginRequired, userController.update);
router.delete('/:id', loginRequired, userController.delete);

// pense sempre sobre a regra de negócio quando estiver
// montando esse tipo de chamada (O que o usuário pode
// fazer? O que ele não pode fazer?)
// mas digamos que temos um nivel de autorização maior
// a qual um tipo de usuario possa excluir outros.
// Também pode acontecer.

export default router;
/*
  index -> lista todos usuarios -> GET
  store/create -> cria um novo usuario -> POST
  delete -> apaga um usuario -> DELETE
  show -> mostra um usuario-> GET
  update -> atualiza um usuario -> PATCH ou PUT
*/
