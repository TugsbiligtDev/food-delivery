"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrdersByUserId = exports.getAllOrders = exports.createOrder = void 0;
const orders_model_js_1 = require("../models/orders.model.js");
const foods_model_js_1 = require("../models/foods.model.js");
const createOrder = async (req, res) => {
    try {
        const { foodOrderItems, totalPrice, deliveryAddress, deliveryPhone } = req.body;
        const userId = req.user._id;
        const foodIds = foodOrderItems.map((item) => item.food);
        const foods = await foods_model_js_1.Food.find({ _id: { $in: foodIds } });
        if (foods.length !== foodOrderItems.length) {
            return res.status(400).json({
                success: false,
                message: "One or more food items not found",
            });
        }
        const calculatedTotal = foodOrderItems.reduce((sum, item) => {
            const food = foods.find((f) => f._id.toString() === item.food);
            return sum + (food?.price || 0) * item.quantity;
        }, 0);
        if (Math.abs(calculatedTotal - totalPrice) > 0.01) {
            return res.status(400).json({
                success: false,
                message: "Total price mismatch",
                expected: calculatedTotal,
                received: totalPrice,
            });
        }
        const newOrder = new orders_model_js_1.Order({
            user: userId,
            foodOrderItems,
            totalPrice,
            deliveryAddress,
            deliveryPhone,
            status: "PENDING",
        });
        const savedOrder = await newOrder.save();
        const populatedOrder = await orders_model_js_1.Order.findById(savedOrder._id)
            .populate("foodOrderItems.food")
            .populate("user");
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: populatedOrder,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating order",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.createOrder = createOrder;
const getAllOrders = async (req, res) => {
    try {
        const orders = await orders_model_js_1.Order.find()
            .populate("foodOrderItems.food")
            .populate("user")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving orders",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.getAllOrders = getAllOrders;
const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const authReq = req;
        const currentUserId = authReq.user._id.toString();
        if (userId !== currentUserId && authReq.user.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Access denied. You can only view your own orders.",
            });
        }
        const orders = await orders_model_js_1.Order.find({ user: userId })
            .populate("foodOrderItems.food")
            .populate("user")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving orders",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.getOrdersByUserId = getOrdersByUserId;
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updateData = req.body;
        const currentOrder = await orders_model_js_1.Order.findById(orderId);
        if (!currentOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        const updatedOrder = await orders_model_js_1.Order.findByIdAndUpdate(orderId, updateData, {
            new: true,
        })
            .populate("foodOrderItems.food")
            .populate("user");
        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: updatedOrder,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating order",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await orders_model_js_1.Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            data: deletedOrder,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting order",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
exports.deleteOrder = deleteOrder;
