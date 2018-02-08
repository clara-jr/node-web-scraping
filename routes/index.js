var express = require('express');
var router = express.Router();

var webController = require('../controllers/webController');

// Definición de rutas

router.route('/').get(webController.index);
router.get('/webs', webController.list); 
router.get('/webs/:webId', webController.findById);

module.exports = router;