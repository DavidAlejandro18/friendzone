const { Router } = require('express');
const router = Router();

// Esta parte del código no tiene relevancia por ahora
// Hasta que agreguemos algún motor de plantilla
router.get('/', (req, res) => {
    res.send('Vista de la página principal');
});

module.exports = router;