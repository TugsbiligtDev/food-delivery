"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        process.exit(1);
    }
}
const foods_routes_js_1 = __importDefault(require("./routes/foods.routes.js"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const categories_routes_js_1 = __importDefault(require("./routes/categories.routes.js"));
const orders_routes_js_1 = __importDefault(require("./routes/orders.routes.js"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 7777;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
    }
    catch {
        process.exit(1);
    }
};
process.on("SIGINT", async () => {
    await mongoose_1.default.connection.close();
    process.exit(0);
});
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests from this IP, please try again later.",
    },
}));
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.PRODUCTION_FRONTEND_URL,
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10mb" }));
connectDB();
app.use("/api/auth", auth_routes_js_1.default);
app.use("/api/foods", foods_routes_js_1.default);
app.use("/api/categories", categories_routes_js_1.default);
app.use("/api/orders", orders_routes_js_1.default);
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Food Ordering API",
    });
});
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
app.listen(PORT, () => { });
//# sourceMappingURL=index.js.map