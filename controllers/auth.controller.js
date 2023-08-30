const UserModel = require("../models/user.model");
const handleSession = require("../util/authentication.util");
const validation = require("../util/validation");

function getSignUp(req, res) {
  res.render("customer/auth/signup");
}

async function signUp(req, res, next) {
  // console.log(req.body);

  const user = new UserModel(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body["code-postal"],
    req.body.street,
    req.body.city
  );

  if (
    !validation.userDetailsValidation(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body["code-postal"],
      req.body.street,
      req.body.city
    )
  ) {
    res.redirect("/signup");
    return;
  }

  if (
    !validation.emailCorrespondenceCheck(
      req.body.email,
      req.body["confirm-email"]
    )
  ) {
    res.redirect("/signup");
    console.log("Emails don't match");
    return;
  }
  
  
  try {
    const emailSimilarity = await user.emailMatch();
    
    if (emailSimilarity) {
      console.log("Email already exist!");
      return res.redirect("/signup");
    }

    await user.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res, next) {
  const user = new UserModel(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.existingUser();
  } catch (error) {
    return next(error);
  }

  if (!existingUser) {
    console.log("Please sign up first. You can use this email to do so!");
    res.redirect("/login");
    return;
  }
  let passwordisValid;

  try {
    passwordisValid = await user.passwordCheck(existingUser.password);
  } catch (error) {
    return next(error);
  }

  if (!passwordisValid) {
    console.log("Please check your password!");
    res.redirect("/login");
    return;
  }

  handleSession.createSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  handleSession.destroySession(req, () => {
    res.redirect("/login");
  });
}

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  signUp: signUp,
  login: login,
  logout: logout,
};
