"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminMiddleware = (req, res, next) => {
    try {
        const authReq = req;
        if (!authReq.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        if (authReq.user.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin role required.",
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Authorization error",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.default = adminMiddleware;
//# sourceMappingURL=admin.middleware.js.map