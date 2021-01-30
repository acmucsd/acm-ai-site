import { message } from 'antd';
import { resolveOnChange } from 'antd/lib/input/Input';
import axios, { AxiosResponse } from 'axios';
import { COOKIE_NAME } from '../../configs';
import { getToken } from '../../utils/token';

export const uploadRLC = async (
    file: File | undefined,
    userid: string
): Promise<AxiosResponse> => {
    if(!file) {
        throw new Error('no file!');
    }

    let token = getToken(COOKIE_NAME);
    return new Promise((resolve, reject) => {
        let bodyFormData = new FormData();
        bodyFormData.set('agent', file);

        axios
            .post(
                process.env.REACT_APP_API + `/v1/competitions/wi21rl/${userid}`,
                bodyFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            .then((res: AxiosResponse) => {
                resolve(res);
            })
            .catch((error) => {
                message.error(error.response.data.error.message);
                reject(error);
            });
    });
};

export const getRLCRanks = async (): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_API + '/v1/competitions/wi21rl')
            .then((res: AxiosResponse) => {
                resolve(res);
            })
            .catch((error) => {
                message.error('Ranks Currently Unavailable');
                reject(error);
            });
    });
};