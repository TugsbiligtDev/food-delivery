"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const validation_schemas_js_1 = require("../schemas/validation.schemas.js");
const router = express_1.default.Router();
router.post("/signin", (0, validation_schemas_js_1.validate)(validation_schemas_js_1.signInSchema), auth_controller_js_1.signIn);
router.post("/signup", (0, validation_schemas_js_1.validate)(validation_schemas_js_1.signUpSchema), auth_controller_js_1.signUp);
exports.default = router;
