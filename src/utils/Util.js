import * as CryptoJS from 'crypto-js'

const key = process.env.REACT_APP_KEY ? process.env.REACT_APP_KEY : 'CoreAppKey'

export const encrypt = (plainText) => {
    const ciphertext = CryptoJS.AES.encrypt(plainText, key).toString();
    return ciphertext
}

export const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8)
    return plaintext
}

export const control = () => {
    //Remember control
    const stremember = localStorage.getItem('data')
    console.log(stremember)

    if (stremember) {
        sessionStorage.setItem('data', stremember)
    }
    const stEncData = sessionStorage.getItem('data')
    console.log(stEncData)

    if (stEncData) {
        try {
            const stData = decrypt(stEncData)
            const securityControl = JSON.parse()
            return securityControl
        } catch (error) {
            sessionStorage.removeItem('data')
        }
    }
    return null
}