function isEmpty(value) {
  return value.trim() === "";
}

function credentialsCheck(email, password) {
  return (
    email && email.includes("@") && password && password.trim().length >= 6
  );
}

function userDetailsValidation(
  email,
  password,
  fullName,
  codePostal,
  street,
  city
) {
  return (
    credentialsCheck(email, password) &&
    !isEmpty(fullName) &&
    !isEmpty(codePostal) &&
    !isEmpty(street) &&
    !isEmpty(city)
  );
}

function emailCorrespondenceCheck(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  userDetailsValidation: userDetailsValidation,
  emailCorrespondenceCheck: emailCorrespondenceCheck,
};
