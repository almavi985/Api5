const express = require('express'),
    auth = require('../middlewares/permiso'),
    router = express.Router(),
    {
        cuenta,
        getUser,
        updateUser,
        deleteUser,
        sesion
    } = require('../controladores');

router.post('/cuenta', cuenta);
router.post('/sesion', sesion);
router.get('/', getUser);
router.put('/', auth, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;