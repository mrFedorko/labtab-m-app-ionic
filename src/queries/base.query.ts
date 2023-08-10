import { HttpResponse } from '@capacitor-community/http';
import { CapacitorHttp  } from '@capacitor/core'
import { useDispatch, useSelector } from 'react-redux';
import { clearStore, setCredentials } from '../redux/store/authSlice';
import { useIonRouter } from '@ionic/react';



export enum HttpMethod {
    POST = "POST",
    GET = "GET",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE"
}

export interface IQueryOptions {
    url: string;
    data?: any;
    method?: HttpMethod;
    headers?:Record<string, string>
}

export const baseUrl = 'http://45.132.50.167:8080/api'

export const useQuery = async (
    options: IQueryOptions,  
    ) => {    
    

    const {url, data, method, headers} = options;
    
    let httpOtions: Record<keyof IQueryOptions, any> = {
        data,
        headers,
        method,
        url
    };
    
    httpOtions.url = baseUrl+url;
    
    if(!method){
        httpOtions.method = method;
    }
    if(method && method !== HttpMethod.GET){
        httpOtions.data = JSON.stringify(data);
        httpOtions.method = method;
    }
    if(headers){
        httpOtions.headers = headers;
    }
    if(!headers){
        httpOtions.headers = {'Content-type':'application/json'}
    }
    console.log(httpOtions);

    const response: HttpResponse = await  CapacitorHttp.request({...httpOtions,})
    return response
}
export const useAuthQuery = () => { 
   
    const { token, email } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const router = useIonRouter();
    const authQuery = async (
        options: IQueryOptions,  
        ) => {
        const {url, data, method, headers} = options;
    
        let httpOtions: Record<keyof IQueryOptions, any> = {
            data,
            headers,
            method,
            url
        };
        
        httpOtions.url = baseUrl+url;
        
        if(!method){
            httpOtions.method = method;
        }
        if(method && method !== HttpMethod.GET){
            httpOtions.data = JSON.stringify(data);
            httpOtions.method = method;
        }
        if(headers){
            httpOtions.headers = {
                ...headers,
                'authorization': `Bearer ${token}`
            };
        }
        if(!headers){
            httpOtions.headers = {'Content-type':'application/json', 'authorization': `Bearer ${token}`}
        }
        
        const response: HttpResponse = await  CapacitorHttp.request({...httpOtions});
        if(response?.status === 401 || response.status === 403 ) {
            try {
                const refreshResult = await useQuery({
                    url: '/refresh'
                });
                if(refreshResult?.status === 200){
                    dispatch(setCredentials({...refreshResult.data, email}))
                    
                    const refreshResponse: HttpResponse = await  CapacitorHttp.request({...httpOtions, headers:{...headers, 'authorization': `Bearer ${refreshResult.data.accessToken}`}});
                    return refreshResponse;
                } else {
                    return
                }
            } catch (error) {
                dispatch(clearStore);
                
            }
        }
        return response   
    }
    return authQuery;      
}