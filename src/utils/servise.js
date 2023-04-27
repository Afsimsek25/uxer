import axios from "axios";
import { control } from './Util';


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

export const userLogin = (email, password) => {
    const sendParams = {
        usernameOrEmail: email,
        password: password,
    }
    let result = config.post("Auth/login", sendParams)
    console.log("result", result);
    return result;
}
export const userRegister = (firstName, lastName,userName,email,password,passwordConfirm) => {
    const sendParams = {
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        email:email,
        password:password,
        passwordConfirm:passwordConfirm
    }
    console.log(sendParams)
    return config.post("User/register", sendParams)
}