import { http } from '@/utils/http';
class menuDataService {
    async getAll(parametros) {
        const response = await http.
            get('menus', {
            params: parametros
        });
        return (response.data);
    }
    get(id) {
        return http.get(`menus/${id}`);
    }
    async create(data) {
        return await http.post("menus", data);
    }
    async update(id, data) {
        return http.put(`menus/${id}`, data);
    }
    async delete(id) {
        return http.delete(`menus/${id}`);
    }
    deleteAll() {
        return http.delete(`menus`);
    }
    findByTitle(title) {
        return http.get(`menus?title=${title}`);
    }
    async paginar(current_page) {
        const response = await http.get(`menus?page=${current_page}`);
        return (response.data);
    }
}
export default new menuDataService();
//# sourceMappingURL=menuDataService.js.map