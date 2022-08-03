const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
	res.render('index',{title: 'Chat App'});
});

router.post('/',(req,res)=>{
	name = req.body.name;
	res.redirect('/chat/:'+req.body.name);
});

module.exports = router;