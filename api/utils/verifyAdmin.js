import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));

        if (!user.isAdmin) return next(errorHandler(403, 'Forbidden: Not an Admin'));
        
        req.user = user;
        next();
    });
};
