import axios from "axios";
import { control } from './Util';
import { ILogin } from "../models/ILogin";


const baseURL = 'https://gateway-test.u-xer.com/api/'

const config = axios.create({
    baseURL: baseURL

})

const configJwt = () => {
    return (axios.create({
        baseURL: baseURL,
        headers: { 'Authorization': 'Bearer ' + control()?.accessToken }
    }))

}

export const userLogin = (email: string, password: string) => {
    const sendParams = {
        usernameOrEmail: email,
        password: password,
    }
    return config.post<ILogin>("Auth/login", sendParams)
}
export const userRegister = (firstName: string, lastName: string,userName: string,email:string,password:string,passwordConfirm:string) => {
    const sendParams = {
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        email:email,
        password:password,
        passwordConfirm:passwordConfirm
    }
    console.log(sendParams)
    return config.post<ILogin>("User/register", sendParams)
}