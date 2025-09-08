"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const foods_controller_js_1 = require("../controllers/foods.controller.js");
const auth_middleware_js_1 = __importDefault(require("../middleware/auth.middleware.js"));
const admin_middleware_js_1 = __importDefault(require("../middleware/admin.middleware.js"));
const validation_schemas_js_1 = require("../schemas/validation.schemas.js");
const router = express_1.default.Router();
router.get("/", foods_controller_js_1.getAllFoods);
router.get("/:foodId", (0, validation_schemas_js_1.validateParams)(zod_1.z.object({ foodId: validation_schemas_js_1.mongoIdSchema })), foods_controller_js_1.getFoodById);
router.post("/", auth_middleware_js_1.default, admin_middleware_js_1.default, (0, validation_schemas_js_1.validate)(validation_schemas_js_1.createFoodSchema), foods_controller_js_1.createFood);
router.patch("/:foodId", (0, validation_schemas_js_1.validateParams)(zod_1.z.object({ foodId: validation_schemas_js_1.mongoIdSchema })), auth_middleware_js_1.default, admin_middleware_js_1.default, (0, validation_schemas_js_1.validate)(validation_schemas_js_1.updateFoodSchema), foods_controller_js_1.updateFood);
router.delete("/:foodId", (0, validation_schemas_js_1.validateParams)(zod_1.z.object({ foodId: validation_schemas_js_1.mongoIdSchema })), auth_middleware_js_1.default, admin_middleware_js_1.default, foods_controller_js_1.deleteFood);
exports.default = router;
