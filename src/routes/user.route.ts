import { Router } from 'express';
import { UserExpress } from '../middleware/user.express'

class UserRoute {
    static init(router: Router) {

        const routePrefix = '/user';

        router.route(`${routePrefix}`)
            .get(UserExpress.getUserData);

    }
}


export = UserRoute