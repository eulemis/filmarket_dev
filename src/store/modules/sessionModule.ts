import {
  getModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  VuexModule,
} from 'vuex-module-decorators';
import store from '@/store';
import { UserSubmit } from '../interfaces/Auth';
import { UserToken } from '../interfaces/UserToken';
import { http } from '@/utils/http';
import { User } from '../interfaces/User';
import { fetchUser,  fetchSubMenu } from '@/utils/utility'
import { Menu } from '../interfaces/Menu';
import { SubMenu } from '../interfaces/SubMenu';
import { deserialize } from 'jsonapi-fractal'
import storageData from '@/store/services/storageService'

@Module({
  namespaced: true,
  name: 'session',
  store,
  dynamic: true,
})

class sessionModule extends VuexModule {

	token : string = '';
	refresh_token: string | null = localStorage.getItem('_refresh_token');
	tokens: UserToken[] = [];
	userSesion: User[] = [];
	userMenu: Menu[] = [];
	userSubMenu: SubMenu[] = [];
	setting : any[] = [];

	get getTokens() {
		return storageData.get('_token');
	}

	get getSetting() {
		return  storageData.get('_setting');
	}

	@Mutation
	setSetting(setting: any) {
		this.setting = setting;
	}

	@Mutation
	destroySetting(){
		this.setting = [];
	}

	@Mutation
	destroyDataSelect(){
		this.setting = [];
	} 

	@Mutation
	setTokens(tokens: UserToken[]) {
		this.tokens = tokens;
	}

	@Mutation
	setToken(token: string) {
		this.token = token;
	}

	@Mutation
	setRefresh_token(refresh_token: string) {
		this.refresh_token = refresh_token;
	}
	@Mutation
	destroyTokens() {
		this.tokens = [];
	}
	@Mutation
	destroyToken() {
		this.token = '';
		this.refresh_token = null;
	}
  	@Action
	async login(userLogin: UserSubmit) {
		await http.post('login', userLogin)
		.then((payload: any) => {
			if (payload) {
        console.log(payload)
			const login = deserialize(payload.data)
      console.log(login)
			userLogin.code = payload.status
			
			if (userLogin.code === 200) {
				const stoken: string  = login.access_token;
				const setting: string = login.configuracion_general
				storageData.set('_token', stoken);
				storageData.set('_setting', setting);
				this.context.commit('setToken', stoken);
				this.context.commit('setSetting', setting);
				this.context.commit('setTokens', payload.data.data);

			}
			} else {
			userLogin.code = 500;
			userLogin.message = 'Error grave con Servidor';
			}
		})
		.catch((e) => {
			userLogin.code = 500;
			userLogin.message = 'Error 500 grave con Servidor ';
		});
		return userLogin;
	}

  @Action
  async logout() {
    http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
    await http
      .post('logout')
      .then((payload: any) => {
        storageData.remove('_token');
        storageData.remove('_setting');
        storageData.remove('_refresh_token');
        storageData.remove('_setting');
        storageData.remove('_dataSelect');
        this.context.commit('destroyToken');
        this.context.commit('destroyTokens');
        this.context.commit('destroySetting');
        this.context.commit('destroyDataSelect');
        return payload;
      })
      .catch((e) => console.log('Error ${e}'));
  }

  @Action
  async getRefreshToken() {
    const stoken: string = ''
    await http
      .post('refreshtoken',
        {
          'refresh_token': this.refresh_token
        })
      .then((payload: any) => {
        if (payload) {
          if (payload.data.code === 200) {
            const stoken: string = payload.data.data.access_token;
            const srefresh_token: string = payload.data.data.refresh_token;
            storageData.set('_token', stoken);
            storageData.set('_refresh_token', srefresh_token);
            this.context.commit('setToken', stoken);
            this.context.commit('setRefresh_token', srefresh_token);
          }
        }
      })
      .catch((err) => {
        console.log(err.data.error);
        return false;
      });
    return true;
  }

  @MutationAction({ mutate: ['userSesion', 'userMenu', 'userSubMenu'] })
  async loadUser() {
    const user = await fetchUser();
    //const userMenu = await fetchMenu();
    const userSubMenu = await fetchSubMenu(user.role_id);
    const menu: Menu[] =[];

    ///registro todos ls padres de los submenus
    Object.keys(userSubMenu).map(function(Index){
      let submenu = userSubMenu[Index];
      menu.push(submenu.menu.data);
    });
    

    //elimino los padres repetidos
    const menuArray = menu.filter((menuItem, index) => {
      const _menu = JSON.stringify(menuItem);
      return index === menu.findIndex(obj => {
        return JSON.stringify(obj) === _menu;
      });
    });

    const userMenu = menuArray;
    return { userSesion: user, userMenu, userSubMenu };
  }


  
}
export default getModule(sessionModule);
