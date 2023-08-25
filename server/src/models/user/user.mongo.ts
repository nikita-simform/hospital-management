const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim:true
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (this:any,password:string) {
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {});

userSchema.methods = {
  authenticate: function (plainPassword:string) {
    return this.securePassword(plainPassword) === this.encry_password;
  },

  securePassword: function (plainPassword:string) {
    if (!plainPassword) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      return error;
    }
  },
};

const User= mongoose.model("User",userSchema);
export default User;