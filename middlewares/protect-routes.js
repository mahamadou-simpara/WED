function protectAuthRoute(req, res, next) {
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  };
  next();
}



function protectAdminRoute(req, res, next) {
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  };

  if (!res.locals.isAdmin) {
    return res.redirect("/403");
  };

  next();
};






module.exports = {
  protectAdminRoute: protectAdminRoute,
  protectAuthRoute: protectAuthRoute
};
