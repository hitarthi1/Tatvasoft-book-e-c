import request from "../../utils/request";
//import { ICreateUser, ILogin } from "./auth.model";

class AuthService {
    ENDPOINT = 'api/BookStore';

    async login(data) {
        const url = `${this.ENDPOINT}/Login`;
        return request({ url, method: 'POST', data }).then((res) => {
            return res.data;
        });
    }

    async create(data) {
        const url = `${this.ENDPOINT}/RegisterUser`;

        // const result = await fetch("http://localhost:5000/api/BookStore/RegisterUser", {
        //     method: "post",
        //     body: JSON.stringify({
        //       patientName,
        //       doctorName,
        //       number,
        //       appointmentDate,
        //       proof,
        //       identitynumber,
        //       slot,
        //     })
        //   });



        return request({ url, method: 'POST', data }).then((res) => {
            return res.data;
        });
    }
}
export default new AuthService();
