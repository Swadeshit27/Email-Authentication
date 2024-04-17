import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface RequestWithUser extends Request {
    userId?: string;
}

const authentication = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(404).json("Authorization header is missing");
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            return res.status(403).json("Unauthorized access");
        } else {
            const payload = decoded as JwtPayload;
            if (payload && payload['userId']) { 
                req.userId = payload['userId'].toString();
                next();
            } else {
                return res.status(403).json("Unauthorized access");
            }
        }
    });
};

export default authentication;
