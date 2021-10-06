export interface PersonalUserData {
    id: string;
    name: string;
    orgId: string;
    mail: string;
    role: number;
    managerId: string;
    status: string;
    currentIssue: string;
    trainingStage: string;
    userAttributes: { [key: string]: string };
    courseLesson: string;

}


