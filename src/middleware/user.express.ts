import { PersonalUserData } from '../models/personal-user-data.interface';
import { UserService } from '../services/user.service';
import { Request, Response, NextFunction } from 'express';

export class UserExpress {
    static async getUserData(req: Request, res: Response, next: NextFunction) {
        console.log('user is returned');
        const userId = req.params.userId;
        const userData: PersonalUserData = await UserService.getUserDataById(userId, req);
        res.send(userData);
    }
}