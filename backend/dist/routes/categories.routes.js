"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_js_1 = require("../controllers/categories.controller.js");
const auth_middleware_js_1 = __importDefault(require("../middleware/auth.middleware.js"));
const admin_middleware_js_1 = __importDefault(require("../middleware/admin.middleware.js"));
const validation_schemas_js_1 = require("../schemas/validation.schemas.js");
const zod_1 = require("zod");
const router = express_1.default.Router();
router.get("/", categories_controller_js_1.getAllCategories);
router.post("/", auth_middleware_js_1.default, admin_middleware_js_1.default, (0, validation_schemas_js_1.validate)(validation_schemas_js_1.createCategorySchema), categories_controller_js_1.createCategory);
router.patch("/:categoryId", (0, validation_schemas_js_1.validateParams)(zod_1.z.object({ categoryId: validation_schemas_js_1.mongoIdSchema })), auth_middleware_js_1.default, admin_middleware_js_1.default, (0, validation_schemas_js_1.validate)(validation_schemas_js_1.updateCategorySchema), categories_controller_js_1.updateCategory);
router.delete("/:categoryId", (0, validation_schemas_js_1.validateParams)(zod_1.z.object({ categoryId: validation_schemas_js_1.mongoIdSchema })), auth_middleware_js_1.default, admin_middleware_js_1.default, categories_controller_js_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categories.routes.js.map