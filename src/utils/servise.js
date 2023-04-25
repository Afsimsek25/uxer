import axios from "axios";
import { control } from './Util';


const baseURL = 'http://gateway-test.u-xer.com/api/'

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
    /* return {
        accessToken: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiYWZzaW1zZWsiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZnNpbXNlazI1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IiIsIlV4ZXJUb2tlblR5cGUiOiJVc2VyIiwiVXhlckFjY291bnRJZCI6IiIsIlV4ZXJVc2VySWQiOiI0MTIwMmNlZi01ZGZjLTQ0NjQtOWVkMC0xZWVlMzgzMjJlMGMiLCJuYmYiOjE2ODI0MjQ3MDksImV4cCI6MTY4ODQyNDY0OSwiaXNzIjoidS14ZXIuY29tIiwiYXVkIjoidS14ZXIuY29tIn0.qIftJV1-K4BJYZjagW_3xTJg2jpssncDOnZ-uXYRDEG6iJddtQVLUdbMpRP_lr9VC4nHUYSRl3_X-P_Yl4tHwA",
        expires: "2023-07-03T22:50:49.4452126Z",
        notBefore: "2023-04-25T12:11:49.4455281Z",
        refreshToken: "Sax1HFJ9EmJDijfwyyGSJIfqZMDgf8uwWzkpYXayf4U="
      }  */
    
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