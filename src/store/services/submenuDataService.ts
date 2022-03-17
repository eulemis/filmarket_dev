import { http } from '@/utils/http';
import { SubMenu } from '../interfaces/SubMenu';
import sessionModule from '@/store/modules/sessionModule'

class menuDataService {
 
 
  async getAll(parametros?:Object) {
      
      const response = await http.
      get('submenus?include=menu', 
      {
        params: parametros
      });
      return (response.data);
  }


  get(id: string) {
    return http.get(`submenus/${id}`);
  }

  async create(data: SubMenu) {
    return  await http.post("submenus", data);
    
  }

  async update(id: number, data: SubMenu) {
    return http.put(`submenus/${id}`, data);
  }

  async delete(id: number) {
    return http.delete(`submenus/${id}`);
  }

  deleteAll() {
    return http.delete(`submenus`);
  }

  findByTitle(title: string) {
    return http.get(`submenus?title=${title}`);
  }

  async paginar(current_page:number) {
    const response = await   http.get(`submenus?page=${current_page}`);
    return (response.data);
  }
}

export default new menuDataService();