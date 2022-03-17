import {
  getModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  VuexModule,
} from 'vuex-module-decorators';
import store from '@/store';
import menuservice from '@/store/services/menuDataService';
import { Menu } from '../interfaces/Menu';
import { Pagination } from '../interfaces/Pagination';

@Module({
  namespaced: true,
  name: 'menu',
  store,
  dynamic: true,
})



class menuModule extends VuexModule {

  menus: Menu[] = [];
  pagination: Pagination={
    total:0,
    count: 0,
    per_page: 10,
    current_page: 1,
    total_pages: 1,
    
  };
  
  
  @MutationAction({ mutate: ['menus', 'pagination'] })
  async getAll(parametros?:Object) {
    const data = await menuservice.getAll(parametros);
    const menus= data.data;
    const pagination = data.meta.pagination;
    return { menus, pagination };
  }

  @MutationAction({ mutate: ['menus'] })
  async paginarMenu(page:number) {
    const data = await menuservice.paginar(page);
    const menus = data.data;
    return { menus };
  }

  @Action
  async createMenu(menu: Menu) {
    await menuservice
      .create(menu)
      .then((payload: any) => {


      })
      .catch((e) => console.log(e));
  }

  @Action
  async actualizarMenu(menu: Menu) {
     await menuservice
      .update(menu.id, menu)
      .then((payload: any) => {

      })
      .catch((e:any) => console.log(e));
  }

  @Action
  async eliminarMenu(menu: Menu) {
    const response = await menuservice.delete(menu.id);
    if (response.status=== 201){
      return await this.getAll();
    }
  }


}
export default getModule(menuModule);
