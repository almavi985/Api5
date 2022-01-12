const express = require('express'),
    auth = require('../middlewares/permiso'),
    router = express.Router(),
    {
        addP,
        obtP
    } = require('../controladores');

router.post('./',auth, addP);
router.get('./',auth, obtP);

module.exports = router;

