const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { Db } = require("mongodb");
const { useReducer } = require("react");

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  preferredlang: { type: String, required: true },
  country: { type: String, required: true },
  date: { type: Date, default: Date.now }
});
var newPassword = 0;

userSchema.pre(
  'save',
  async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    newPassword = hash;
    next();
  }
);


userSchema.methods.validPassword = async function (password) {
  const user2 = this;
  valid = false;
  valid = bcrypt.compare(password, user2.password).then(response => {
    console.log("user.js valid password?: ", valid, password);
    if (response !== true) {
      console.log('passwords do not match');
      //return done(null, false, { message: 'passwords do not match' });
      return valid;
    }
    console.log('user found & authenticated');
    // note the return needed with passport local - remove this return for passport JWT
    //return done(null, user);
    return valid;
  });

  const user = this;
  var compare = bcrypt.compare(password, user.password);
  console.log("user.js.validPassword password, user.password: ", newPassword, user.password);
  return compare;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
