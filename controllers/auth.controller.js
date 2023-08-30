const UserModel = require("../models/user.model");
const handleSession = require("../util/authentication.util");

function getSignUp(req, res) {
  res.render("customer/auth/signup");
}

async function signUp(req, res) {
  // console.log(req.body);

  const user = new UserModel(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body["code-postal"],
    req.body.street,
    req.body.city
  );

  await user.signup();
  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res) {
  const user = new UserModel(req.body.email, req.body.password);

  const existingUser = await user.existingUser();

  if (!existingUser) {
    console.log("Please sign up first. You can use this email to do so!");
    res.redirect("/login");
    return;
  }

  const passwordisValid = await user.passwordCheck(existingUser.password);

  if (!passwordisValid) {
    console.log("Please check your password!");
    res.redirect("/login");
    return;
  }

  handleSession.createSession(req, existingUser, function () {
    res.redirect("/");
  });
};

function logout(req, res) {
  handleSession.destroySession(req, () => {
    res.redirect('/login');
  });
};

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  signUp: signUp,
  login: login,
  logout: logout
};
