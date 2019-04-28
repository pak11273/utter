"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripe = void 0;

var _stripe = _interopRequireDefault(require("stripe"));

var stripe = new _stripe.default(process.env.STRIPE_SECRET);
exports.stripe = stripe;