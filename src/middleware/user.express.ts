import { Request, Response, NextFunction } from 'express';

export class UserExpress {
    static getUserData(req: Request, res: Response, next: NextFunction) {
        console.log('user is returned');
        res.send('shaul');
    }
}