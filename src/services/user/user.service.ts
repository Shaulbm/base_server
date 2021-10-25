import { PersonalUserData } from '../../models/personal-user-data.interface';
import axios, { Method } from "axios";
import { Request } from 'express';
import { MoovLogger } from '../../utils/logger';
import { AxiosProvider } from '../../utils/axiosProvider';
import config from '../../utils/config'
import NetworkUtils from '../../utils/network-utils'

export class UserService {

    public static async getUserDataByIdGET(userId: string, userEmail: string, req: Request): Promise<PersonalUserData> {
        try {
            const axiosInstance = AxiosProvider.getInstance(config.backendTimeout);
            const response = await axiosInstance.get<PersonalUserData>(`${NetworkUtils.getBackendUrl()}/user?id=${userId}&mail=${userEmail}`);
            return (response.data);
        } catch (error: Error) {
            MoovLogger.error(`Error occured when fetching getUserDataById: ${JSON.stringify(error)}`);
            throw new Error(`Error occured when fetching getUserDataById: ${JSON.stringify(error)}`);
        }
    }

    public static async getUserDataById(userId: string, userEmail: string, req: Request): Promise<PersonalUserData> {
        try {
            const axiosInstance = AxiosProvider.getInstance(config.backendTimeout);
            const response = await axiosInstance.post<PersonalUserData>(`${NetworkUtils.getBackendUrl()}/user?id=${userId}&mail=${userEmail}`);
            return (response.data);
        } catch (error: Error) {
            MoovLogger.error(`Error occured when fetching getUserDataById: ${JSON.stringify(error)}`);
            throw new Error(`Error occured when fetching getUserDataById: ${JSON.stringify(error)}`);
        }
    }
}
