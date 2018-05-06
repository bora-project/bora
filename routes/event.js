var express = require('express');
var router = express.Router();
var event = require("../controllers/EventController.js");

// Get all employees
// router.get('/', function(req, res, next) {
// 	res.render('_messageBox', { title: 'Bora' });
// });

// // Get single employee by id
// router.get('/show/:id', employee.show);

// Save employee
router.post('/create', event.create);

// // Edit employee
// router.get('/edit/:id', employee.edit);

// // Edit update
// router.post('/update/:id', employee.update);

// // Edit update
// router.post('/delete/:id', employee.delete);

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('_messageBox');
});

module.exports = router;
