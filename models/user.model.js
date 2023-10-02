const db = require("../data/database");
const mongodb = require('mongodb')
const bcrypt = require("bcrypt");


class User {
  constructor(email, password, fullname, codePostal, street, city) {
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.address = {
      codePostal: codePostal,
      street: street,
      city: city,
    };
  }


  static getUserById(userId){
    const id = new mongodb.ObjectId(userId)

    return db.getDB().collection("users").findOne({_id: id}, { projection: { password: 0 }});
  };

  async signup() {
    const password = await bcrypt.hash(this.password, 12);

    const user = {
      email: this.email,
      password: password,
      fullname: this.fullname,
      address: {
        codePostal: this.address.codePostal,
        street: this.address.street,
        city: this.address.city,
      },
    };
    // console.log(user);
    await db.getDB().collection("users").insertOne(user);
  }


  existingUser() {
    return db.getDB().collection("users").findOne({email: this.email});
  }

  async emailMatch(){
   
    const match =  await this.existingUser();
    // console.log(match);
    return match;
  };

  async passwordCheck(existingUser) {
    // const existingUser = await db.getDB().collection("users").findOne({email: this.email})
    return bcrypt.compare(this.password, existingUser);
  };


  


}

// Would you be a cynic or would be a builder
module.exports = User;
