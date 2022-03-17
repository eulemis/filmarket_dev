import {
  getModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  VuexModule,
} from 'vuex-module-decorators';
import store from '@/store';
import submenuservice from '@/store/services/submenuDataService';
import { SubMenu } from '../interfaces/SubMenu';
import { Pagination } from '../interfaces/Pagination';

@Module({
  namespaced: true,
  name: 'submenu',
  store,
  dynamic: true,
})



class submenuModule extends VuexModule {

  submenus: SubMenu[] = [];
  pagination: Pagination={
    total:0,
    count: 0,
    per_page: 10,
    current_page: 1,
    total_pages: 1,
    
  };
  
  
  @MutationAction({ mutate: ['submenus', 'pagination'] })
  async getAll(parametros?:Object) {
    const data = await submenuservice.getAll(parametros);
    const submenus= data.data;
    const pagination = data.meta.pagination;
    return { submenus, pagination };
  }

  @MutationAction({ mutate: ['submenus'] })
  async paginarMenu(page:number) {
    const data = await submenuservice.paginar(page);
    const submenus = data.data;
    return { submenus };
  }

  @Action
  async createMenu(SubMenu: SubMenu) {
    await submenuservice
      .create(SubMenu)
      .then((payload: any) => {


      })
      .catch((e) => console.log(e));
  }

  @Action
  async actualizarMenu(SubMenu: SubMenu) {
     await submenuservice
      .update(SubMenu.id, SubMenu)
      .then((payload: any) => {

      })
      .catch((e:any) => console.log(e));
  }

  @Action
  async eliminarMenu(SubMenu: SubMenu) {
    const response = await submenuservice.delete(SubMenu.id);
    if (response.status=== 201){
      return await this.getAll();
    }
  }


}
export default getModule(submenuModule);
