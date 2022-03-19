import { http } from '@/utils/http';
import { Menu } from '../interfaces/Menu';
import sessionModule from '@/store/modules/sessionModule'

class menuDataService {
 
 
  async getAll(parametros?:Object) {
      
      const response = await http.
      get('menus', 
      {
        params: parametros
      });
      return (response.data);
  }


  get(id: string) {
    return http.get(`menus/${id}`);
  }

  async create(data: Menu) {
    return  await http.post("menus", data);
    
  }

  async update(id: number, data: Menu) {
    return http.put(`menus/${id}`, data);
  }

  async delete(id: number) {
    return http.delete(`menus/${id}`);
  }

  deleteAll() {
    return http.delete(`menus`);
  }

  findByTitle(title: string) {
    return http.get(`menus?title=${title}`);
  }

  async paginar(current_page:number) {
    const response = await   http.get(`menus?page=${current_page}`);
    return (response.data);
  }
}

export default new menuDataService();