import { PersonalUserData } from '../models/personal-user-data.interface';
import { UserService } from '../services/user/user.service';
import { Request, Response, NextFunction } from 'express';
import { MoovLogger } from '../utils/logger';
export class UserExpress {
    static async getUserData(req: Request, res: Response, next: NextFunction) {
        MoovLogger.debug('user is returned');
        const userId = req.params.userId;
        const userEmail = req.params.email;
        const userData: PersonalUserData = await UserService.getUserDataById(userId, userEmail, req);
        res.send(userData);
    }
}