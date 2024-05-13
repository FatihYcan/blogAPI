"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOP API
------------------------------------------------------- */

const mongoose = require("mongoose");

// //? PASSWORD ENCRYPTION
// // https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
// //! npm i yapmaya gerek yok.
// const crypto = require("node:crypto");

// const keyCode = process.env?.SECRET_KEY || "write_random_chars_in_here";
// const loopCount = 10_000; // 10000
// const charCount = 32; // write 32 for 64
// const encType = "sha512";

// const passwordEncrypt = function (password) {
//   return crypto
//     .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
//     .toString("hex");
// };

const passwordEncrypt = require("../helpers/passwordEncrypt");

//? SCHEMA
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      // required: true,
      required: [
        true,
        "Email must be required", // false message
      ],
      // unique: [true, 'Email must be unique.']
      unique: true,

      //   validate: (email) => {return true;},

      //   validate: [
      //     (email) => {
      //       if (email.includes("@") && email.includes(".")) {
      //         return true;
      //       }
      //       return false;
      //     },
      //     //! Email false olduğu zaman yayınlamak isteğim mesaj
      //     "Email type is incorrect",
      //   ],

      //? Kısa yolu
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Email type is incorrect",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      //! Set parametresi set fonksiyonun çıktısı veri tabanına yazılır
      // set: () => {return "fatih"},
      // set: function () {return "fatih"},

      set: (password) => passwordEncrypt(password),
      // set: passwordEncrypt,
    },
    firstName: String,
    lastName: String,
  },
  { collection: "user", timestamps: true }
);

// module.exports = { User: mongoose.model("User", UserSchema) };
module.exports = mongoose.model("User", UserSchema);
