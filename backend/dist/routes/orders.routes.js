"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_controller_js_1 = require("../controllers/orders.controller.js");
const auth_middleware_js_1 = __importDefault(require("../middleware/auth.middleware.js"));
const admin_middleware_js_1 = __importDefault(require("../middleware/admin.middleware.js"));
const validation_schemas_js_1 = require("../schemas/validation.schemas.js");
const zod_1 = require("zod");
const router = express_1.default.Router();
router.post("/", auth_middleware_js_1.default, (0, validation_schemas_js_1.validate)(validation_schemas_js_1.createOrderSchema), orders_controller_js_1.createOrder);
router.get("/", auth_middleware_js_1.default, admin_middleware_js_1.default, orders_controller_js_1.getAllOrders);
router.get("/user/:userId", (0, validation_schemas_js_1.validateParams)(zod_1.z.object({ userId: validation_schemas_js_1.mongoIdSchema })), auth_middleware_js_1.default, orders_controller_js_1.getOrdersByUserId);
router.patch("/:orderId", (0, validation_schemas_js_1.validateParams)(zod_1.z.object({ orderId: validation_schemas_js_1.mongoIdSchema })), auth_middleware_js_1.default, admin_middleware_js_1.default, (0, validation_schemas_js_1.validate)(validation_schemas_js_1.updateOrderSchema), orders_controller_js_1.updateOrder);
router.delete("/:orderId", (0, validation_schemas_js_1.validateParams)(zod_1.z.object({ orderId: validation_schemas_js_1.mongoIdSchema })), auth_middleware_js_1.default, admin_middleware_js_1.default, orders_controller_js_1.deleteOrder);
exports.default = router;
//# sourceMappingURL=orders.routes.js.map