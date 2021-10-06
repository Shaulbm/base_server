import { PersonalUserData } from '../models/personal-user-data.interface';
import axios, { Method } from "axios";
import { Request } from 'express';

export class UserService {
    public static async getUserDataByIdGET(userId: string, req: Request): Promise<PersonalUserData> {
        try {
            const response = await axios.get(`https://52.30.104.65:8000/registerUser?user=${userId}`);
            return (response.data as PersonalUserData);
        } catch (error: any) {
            console.log(`Error occured when fetching getUserDataById: ${JSON.stringify(error)}`);
            throw new Error(`Error occured when fetching getUserDataById: ${JSON.stringify(error)}`);
        }
    }

    public static async getUserDataById(userId: string, req: Request): Promise<PersonalUserData> {
        try {
            const response = await axios.post(`https://52.30.104.65:8000/registerUser?user=${userId}`);
            return (response.data as PersonalUserData);
        } catch (error: any) {
            console.log(`Error occured when fetching getUserDataById: ${JSON.stringify(error)}`);
            throw new Error(`Error occured when fetching getUserDataById: ${JSON.stringify(error)}`);
        }
    }
}
