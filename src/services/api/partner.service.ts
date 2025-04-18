import {partnerRequest}  from "../../hook/api";
import {ParentInvite } from "./_model";

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



class PartnerService {

    async partnerInvite(payload: ParentInvite) {
        try {
            const response = await partnerRequest(
                '/partner/parent/invite' ,
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async allPartnerCohort() {
        try {
            const response = await partnerRequest(
                '/partner/cohort/all' ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async allPartnerParent() {
        try {
            const response = await partnerRequest(
                '/partner/parent/all' ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async partnerGetParent( id: number,  cid: number) {
        try {
            const response = await partnerRequest(
                `/partner/parent/${id}/${cid}` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async partnerGetCohort( id: number ) {
        try {
            const response = await partnerRequest(
                `/partner/cohort/${id}` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async allPartnerInvoice() {
        try {
            const response = await partnerRequest(
                '/partner/invoice/all' ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getCurrencyRate(c: string) {
        try {
            const response = await partnerRequest(
                '/common/partners/get-currency-rate' ,
                'POST',
                {country: c},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async createPartnerInvoice(data:any) {
        try {
            const response = await partnerRequest(
                '/common/partners/payment/create' ,
                'POST',
                data,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async disableParent(id:any) {
        try {
            const response = await partnerRequest(
                `/partner/disable/parent/${id}` ,
                'PUT',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async enableParent(id:any) {
        try {
            const response = await partnerRequest(
                `/partner/enable/parent/${id}` ,
                'PUT',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }
}


export default PartnerService;
