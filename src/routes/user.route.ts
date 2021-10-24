import { Router } from 'express';
import { UserExpress } from '../middleware/user.express'

class UserRoute {
    static init(router: Router): void {

        const routePrefix = '/user';

        router.route(`${routePrefix}/:userId`)
            .get(UserExpress.getUserData);

    }
}


export = UserRoute