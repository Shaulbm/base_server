import { Request, Response, NextFunction } from 'express';

export class UserExpress {
    static getUserData(req: Request, res: Response, next: NextFunction) {
        console.log('user is returned');
        res.send({
            "id": "00a31809-08ed-497a-baa6-66f96fe531d7",
            "name": "shaul.ben.maor@gmail.com",
            "orgId": "e0c19e01-8e9a-4a8e-a15c-dea461b76acf",
            "mail": "",
            "role": 2,
            "managerId": "b0317aca-d4a4-40ef-bcc4-9f47364a8f4d",
            "status": "new",
            "currentIssue": "ee728c15-c04a-4ecf-9c19-2a07ed37b65a",
            "trainingStage": "1",
            "userAttributes": {
                "People Oriented": "2",
                "Negative Feedback Gap": "3",
                "Care for the team": "2"
            },
            "courseLesson": "1"
        });
    }
}