import { Response, NextFunction } from "express";
import { Request } from "express";
declare const adminMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default adminMiddleware;
//# sourceMappingURL=admin.middleware.d.ts.map