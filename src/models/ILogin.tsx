export interface ILogin {
    accessToken?:  string;
    expires?:      Date;
    notBefore?:    Date;
    refreshToken?: string;
    key?:          string;
    value?:        string[];
}
