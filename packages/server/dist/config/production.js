"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  logging: false,
  seed: false,
  env: {
    JWT: process.env.JWT,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
    CDN_IMAGE_UPLOAD: process.env.CDN_IMAGE_UPLOAD,
    CDN_VIDEO_UPLOAD: process.env.CDN_VIDEO_UPLOAD,
    CDN_URL: process.env.CDN_URL,
    DB_HOST: process.env.MONGO_URL,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    FACEBOOK_CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    GOOGLE_CLIENTID: process.env.GOOGLE_CLIENTID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    PIXABAY_SECRET: process.env.PIXABAY_SECRET,
    YANDEX_SECRET: process.env.YANDEX_SECRET
  }
};
exports.default = _default;