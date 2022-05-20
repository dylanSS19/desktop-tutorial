 
const { Router } = require('express');

// const { usuariosGet,
//         usuariosPut,
//         usuariosPost,
//         usuariosDelete,
//         usuariosPatch } = require('../controllers/usuarios');


// const {comparar_fotos_post} = require('../controllers/CompararRostros.js');
const {ValUserExist} = require('../controllers/login.js');

const router = Router();
 
// router.get('/', usuariosGet );

// router.put('/:id', usuariosPut );

// router.post('/', comparar_fotos_post );
router.post('/login', ValUserExist);


// router.delete('/', usuariosDelete );

// router.patch('/', usuariosPatch );

module.exports = router;