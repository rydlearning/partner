import {partnerRequest, parentRequest}  from "../../hook/api";
import { ForgotPasswordProps, PasswordUpdateProps, PasswordResetProps, SignInProps, PartnerSignUpProps, ParentSignUpProps } from "./_model";

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @param {string | null} xHash
 * @returns Response Data;
 */



class AuthService {

    /**PARTNER */
    async partnerSignIn(payload: SignInProps) {

        try {
            const response = await partnerRequest(
                '/partner/auth/login' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async partnerSignUp(payload: PartnerSignUpProps) {
        try {
            const response = await partnerRequest(
                '/partner/auth/register' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    /**PARENT */
    async parentSignIn(payload: SignInProps) {

        try {
            const response = await parentRequest(
                '/partner/parent/auth/login' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async parentSignUp(payload: ParentSignUpProps) {
        try {
            const response = await parentRequest(
                '/partner/parent/auth/register' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async passwordReset(payload: PasswordResetProps) {
        try {
            const response = await partnerRequest(
                '' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }
       
    async partnerForgotPassword(payload: ForgotPasswordProps) {
        try {
            const response = await partnerRequest(
                '/partner/auth/password-reset' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async parentForgotPassword(payload: ForgotPasswordProps) {
        try {
            const response = await partnerRequest(
                '/partner/parent/auth/password-reset' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async partnerUpdatePassword(payload: PasswordUpdateProps) {
        try {
            const response = await partnerRequest(
                '/partner/auth/password-update' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async parentUpdatePassword(payload: PasswordUpdateProps) {
        try {
            const response = await parentRequest(
                '/partner/parent/auth/password-update' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }
}


export default AuthService;