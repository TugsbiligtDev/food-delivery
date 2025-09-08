import mongoose from "mongoose";
const { Schema, model } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(v);
            },
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: {
            values: ["ADMIN", "USER"],
            message: "Role must be ADMIN or USER",
        },
        default: "USER",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
userSchema.index({ role: 1 });
export const User = model("User", userSchema);
