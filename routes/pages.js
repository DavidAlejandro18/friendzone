const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Vista de la página principal');
});

module.exports = router;