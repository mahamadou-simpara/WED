const UserModel = require("../models/user.model");
const handleSession = require("../util/authentication.util");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignUp(req, res) {
  // if (!req.session.userData) {
  //   flashUserdata(req, false, "", "", "", "", "", "", "");
  // }

  // const userData = req.session.userData;
  // req.session.userData = null;

  let userData = sessionFlash.getSessionData(req);

  if(!userData){
    userData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullName: '',
      postalCode: '',
      street: '',
      city: ''
    }
  };

  res.render("customer/auth/signup", { userInput: userData });
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

  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    fullName: req.body.fullname,
    postalCode: req.body["code-postal"],
    street: req.body.street,
    city: req.body.city,
  };

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
    sessionFlash.flashUserdata(
      req,
      {
        hasError: true,
        ...enteredData,
        message: "Please check your credential!"
      },
      res.redirect("/signup")
    );
    return;
  }

  if (
    !validation.emailCorrespondenceCheck(
      req.body.email,
      req.body["confirm-email"]
    )
  ) {
    sessionFlash.flashUserdata(
      req,
      {
        hasError: true,
        ...enteredData,
        message: "Please check your credential!"
      },
      res.redirect("/signup")
    );
    return;
  }

  try {
    const emailSimilarity = await user.emailMatch();

    if (emailSimilarity) {
      sessionFlash.flashUserdata(
        req,
        {
          hasError: true,
          ...enteredData,
          message: "Email already exist!"
        },
        res.redirect("/signup")
      );
    }

    await user.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
};

function getLogin(req, res) {
  // if (!req.session.userData) {
  //   flashUserdata(req, false, "", "", "", "", "", "", "");
  // }

  // const userData = req.session.userData;
  // req.session.userData = null;

  let userData = sessionFlash.getSessionData(req);

  if(!userData){
    userData = {
      email: '',
      password: ''
    }
  };

  res.render("customer/auth/login", { userInput: userData });
}

async function login(req, res, next) {
  const user = new UserModel(req.body.email, req.body.password);

  
  let existingUser;
  try {
    existingUser = await user.existingUser();
  } catch (error) {
    return next(error);
  };
 const enteredData = {
  email: user.email,
  password: user.password
 }



  if (!existingUser) {
    sessionFlash.flashUserdata(
      req,
      {
        hasError: true,
        ...enteredData,
        message: "Please sign up first. You can use this email to do so!"
      },
      res.redirect("/login")
    );
    return;
  }
  let passwordisValid;

  try {
    passwordisValid = await user.passwordCheck(existingUser.password);
  } catch (error) {
    return next(error);
  }

  if (!passwordisValid) {
    sessionFlash.flashUserdata(
      req,
      {
        hasError: true,
        ...enteredData,
        message: "Please check your password!"
      },
      res.redirect("/login")
    );
    console.log("Please check your password!");
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
  logout: logout
};
