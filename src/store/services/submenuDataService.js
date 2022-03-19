import { http } from '@/utils/http';
class menuDataService {
    async getAll(parametros) {
        const response = await http.
            get('submenus?include=menu', {
            params: parametros
        });
        return (response.data);
    }
    get(id) {
        return http.get(`submenus/${id}`);
    }
    async create(data) {
        return await http.post("submenus", data);
    }
    async update(id, data) {
        return http.put(`submenus/${id}`, data);
    }
    async delete(id) {
        return http.delete(`submenus/${id}`);
    }
    deleteAll() {
        return http.delete(`submenus`);
    }
    findByTitle(title) {
        return http.get(`submenus?title=${title}`);
    }
    async paginar(current_page) {
        const response = await http.get(`submenus?page=${current_page}`);
        return (response.data);
    }
}
export default new menuDataService();
//# sourceMappingURL=submenuDataService.js.map