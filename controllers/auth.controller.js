const UserModel = require('../models/user.model')

function getSignUp (req, res){

    res.render('customer/auth/signup')
};

async function signUp(req, res){
   
    console.log(req.body);

    const user = new UserModel(req.body.email, req.body.password, req.body.fullname,req.body['code-postal'], req.body.street, req.body.city)

    await user.signup();
    res.redirect('/login')
};



function getLogin (req, res){
    
    res.render('customer/auth/login');
};



module.exports = {
    getSignUp: getSignUp,
    getLogin: getLogin,
    signUp: signUp
}