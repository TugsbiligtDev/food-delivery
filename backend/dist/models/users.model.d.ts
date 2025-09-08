import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: "ADMIN" | "USER";
    isVerified: boolean;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: "ADMIN" | "USER";
    isVerified: boolean;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: "ADMIN" | "USER";
    isVerified: boolean;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: "ADMIN" | "USER";
    isVerified: boolean;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: "ADMIN" | "USER";
    isVerified: boolean;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: "ADMIN" | "USER";
    isVerified: boolean;
    phoneNumber?: string | null | undefined;
    address?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=users.model.d.ts.map