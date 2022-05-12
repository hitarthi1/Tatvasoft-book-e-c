import request from "../../utils/request";
// import { ICommonFilter } from "../common.model";
// import { IAddOrEditCategory } from './category.model';

class CategoryService {
    ENDPOINT = 'category';

     async getAll(params) {
        const url = `${this.ENDPOINT}/Search`;
        return request({ url, method: 'GET', params }).then((res) => {
            return res.data;
        });
    }

     async getById(id) {
        const url = `${this.ENDPOINT}/getById?id=${id}`;
        return request({ url, method: 'GET' }).then((res) => {
            return res.data;
        });
    }

     async delete(id) {
        const url = `${this.ENDPOINT}/delete?id=${id}`;
        return request({ url, method: 'DELETE' }).then((res) => {
            return res.data;
        });
    }

    async getAllOptions() {
        const url = `${this.ENDPOINT}/categoryOptions`;
        return request({ url, method: 'GET' }).then((res) => {
            return res.data;
        });
    }

     async save(data) {
        if (data.id) {
            const url = `${this.ENDPOINT}/update`;
            return request({ url, method: 'PUT', data }).then((res) => {
                return res.data;
            });
        } else {
            const url = `${this.ENDPOINT}/create`;
            return request({ url, method: 'POST', data }).then((res) => {
                return res.data;
            });
        }
    }

}
export default new CategoryService();
