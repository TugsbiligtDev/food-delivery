import { Request, Response } from "express";
export declare const getAllFoods: (req: Request, res: Response) => Promise<void>;
export declare const getFoodById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createFood: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateFood: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteFood: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=foods.controller.d.ts.map