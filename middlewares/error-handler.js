function handleErrors(error, req, res, next) {
    console.log(error);
    res.render('shared/500');
}

module.exports = handleErrors;