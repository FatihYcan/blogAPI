"use strict";

/* BLOG API MODELS */

const mongoose = require("mongoose");

//! mongoose nin sequilize dan farkı model oluşturmadan o model ile ilgili şema ortaya koymalıyız.

//? BLOG CATEGORY

//! İNTERWİEW SORUSU
//! MongoDB de OneToOne ilişki demeye neden gerek yoktur.
//! 1. yöntem blogCategoryId de unique:true denir.
//! 2. yöntem blogCategorySchema içinde relation tanımlanır.

const blogCategorySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    // relation: { name: { type: ... }, name: { type: ... } }, // OneToOne
  },

  {
    collection: "blogCategory", //! collection demek tablo demektir.
    timestamps: true,
  }
);

//? BLOG POST

const blogPostSchema = new mongoose.Schema(
  {
    // _id
    // categoryId

    blogCategoryId: {
      type: mongoose.Schema.Types.ObjectId, // ForeignKey, RelationalID
      ref: "BlogCategory", // Model ismi
      required: true,
      // unique: true  // OneToOne
    },

    title: { type: String, trim: true, required: true },
    content: { type: String, trim: true, required: true },
    published: { type: Boolean, default: true },

    // createdAt,updatedAt,
  },
  { collection: "blogPost", timestamps: true }
);

// mongoose.model('model ismi','hangi şemadan')
// const blogPostModel = mongoose.model("BlogPost", blogPostSchema);
// module.exports = { BlogPost: BlogPostModel };
module.exports = {
  BlogCategory: mongoose.model("BlogCategory", blogCategorySchema),
  BlogPost: mongoose.model("BlogPost", blogPostSchema),
};

/*
//! İki parametre ister. Birincisi fields, ikincisi tabloya ait bilgiler
// const nameSchema = new mongoose.Schema({fields},{tablo adı});
const nameSchema = new mongoose.Schema(
  {
    // _id: // auto created and increment
    // fieldName: Type //? short form
    // fieldName1: String,
    // fieldName2: BigInt,

    fieldName: {
      type: String,
      default: null,
      trim: true,
      unique: false, // benzersiz kayıt
      select: true, // model çağrıldığında gelsin mi // default true
      index: false, // aramalarda erişimi hızlandırır // default false
      required: true, // veri girişi gerekli mi
      required: [true, "error message"], // gerekli mi değil mi, hata mesajı
      enum: [[1, 2, 3], "error message"], // belirli bir patterne göre veri girişi
      validate: [
        function (data) {
          return true;
        },
        "error message",
      ], // veriyi fonksiyon ile doğrulama
      get: function (data){return data} {
        return true;
      }, // veriyi çağırırken çalışacak fonksiyon
      set: function (data){return data} {
        return true; // veriyi kaydederken çalışacak fonksiyon
      },
    },
  },
  {
    collection: "collectionName", // tablo ismi
    timestamps: true, // obje kayıt tarihi ve obje güncelleme tarihi
    
  }
);
*/
