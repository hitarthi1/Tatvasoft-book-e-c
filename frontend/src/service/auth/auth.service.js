import request from "../../utils/request";
//import { ICreateUser, ILogin } from "./auth.model";

class AuthService {
    ENDPOINT = 'api/BookStore';

    async login(data) {
        const url = `${this.ENDPOINT}/Login`;
        return request({ url, method: 'POST', data }).then((res) => {
            console.log(res.data);
            return res.data;
        });
    }

    async create(data) {
        const url = `${this.ENDPOINT}/RegisterUser`;

        return request({ url, method: 'GET', data }).then((res) => {
            return res.data;
        });
    }
}
export default new AuthService();
