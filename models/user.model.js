const db = require("../data/database");

class User {
  constructor(email, password, fullname,codePostal, street, city) {
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.address = {
      codePostal: codePostal,
      street: street,
      city: city,
    }
    
  }

  async signup() {

   const user = {
  email: this.email,
  password: this.password,
  fullname: this.fullname,
  address:{
    codePostal: this.address.codePostal,
    street: this.address.street,
    city: this.address.city,
  }
 
};
    console.log(user);
    await db.getDB().collection("users").insertOne(user);
  }
}

// Would you be a cynic or would be a builder
module.exports = User;



