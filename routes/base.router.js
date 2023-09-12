const express = require('express');


const router = express.Router();


router.get('/401', function(req, res){
    res.render('shared/401');
});

router.get('/404', function(req, res){
    res.render('shared/404');
});

router.get('/403', function(req, res){
    res.render('shared/403');
});


module.exports = router;