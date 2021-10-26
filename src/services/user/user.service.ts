import { PersonalUserData } from '../../models/personal-user-data.interface';
import { Request } from 'express';
import { MoovLogger } from '../../utils/logger';
import { AxiosProvider } from '../../utils/axiosProvider';
import config from '../../utils/config'
import { NetworkUtils } from '../../utils/network-utils'

export class UserService {

    public static async getUserDataById(userId: string, req: Request): Promise<PersonalUserData> {
        try {
            const axiosInstance = AxiosProvider.getInstance(config.backendTimeout);
            const response = await axiosInstance.get<PersonalUserData>(`${NetworkUtils.getBackendUrl()}/user?id=${userId}`);
            return (response.data);
        } catch (error: any) {
            MoovLogger.error(`Error occured when fetching getUserDataById: ${JSON.stringify(error)}`);
            throw new Error(`Error occured when fetching getUserDataById: ${JSON.stringify(error)}`);
        }
    }
}
