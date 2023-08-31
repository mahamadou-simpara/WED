function authenticationCheck(req, res, next){
    const uid = req.session._id;

    console.log(req.session._id);
    if(!uid){
        res.locals.uid = null;
        res.locals.isAuth = false;
        return next();
    };

    res.locals.uid = uid;
    res.locals.isAuth = true;
    // console.log(res.locals.isAuth);

    next();

}

module.exports = authenticationCheck