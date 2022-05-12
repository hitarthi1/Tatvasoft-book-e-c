import request from "../../utils/request";
// import { ICommonFilter } from "../common.model";

class AuthService {
    ENDPOINT = 'user';

     async getAllUsers(params) {
        const url = `${this.ENDPOINT}/Search`;
        return request({ url, method: 'GET', params }).then((res) => {
            return res.data;
        });
    }

     async getAllUserRoles(){
        const url = `${this.ENDPOINT}/UserRoles`;
        return request({ url, method: 'GET' }).then((res) => {
            return res.data;
        });
    }

     async getById(id) {
        const url = `${this.ENDPOINT}/getById?id=${id}`;
        return request({ url, method: 'GET' }).then((res) => {
            return res.data;
        });
    }

     async delete(id){
        const url = `${this.ENDPOINT}/delete?id=${id}`;
        return request({ url, method: 'DELETE' }).then((res) => {
            return res.data;
        });
    }

    async update(data) {
        const url = `${this.ENDPOINT}/update`;
        return request({ url, method: 'PUT', data }).then((res) => {
            return res.data;
        });
    }

}
export default new AuthService();
