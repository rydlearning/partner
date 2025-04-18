import {parentRequest}  from "../../hook/api";
import { AddChildProps, AddProgramProps } from "./_model";

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



class ParentService {

    async getDayTime() {
        try {
            const response = await parentRequest(
                '/common/program/daytime' ,
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

    async getCohort(){
        try {
            const response = await parentRequest(
                `/partner/parent/get/cohort/all` ,
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

    async getParentDashboardData(){
        try {
            const response = await parentRequest(
                `/partner/parent/get/dashboard/data` ,
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

    async addChild(payload: AddChildProps){
        try {
            const response = await parentRequest(
                `/partner/parent/child/add` ,
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

    async getAllPackages() {
        try {
            const response = await parentRequest(
                '/common/package/all' ,
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

    async addProgram(payload: AddProgramProps, id: number, pid: number ){
        try {
            const response = await parentRequest(
                `/partner/parent/program/add/${id}/${pid}` ,
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

    async getParentInvite(){
        try {
            const response = await parentRequest(
                `/partner/parent/invite` ,
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

}


export default ParentService;
