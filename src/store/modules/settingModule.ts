import {
  getModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  VuexModule,
} from 'vuex-module-decorators';
import store from '@/store';
import { Setting } from '../interfaces/Setting';
import { UserToken } from '../interfaces/UserToken';
import { http, https } from '@/utils/http';
import { deserialize } from 'jsonapi-fractal'

@Module({
  namespaced: true,
  name: 'setting',
  store,
  dynamic: true,
})

class settingModule extends VuexModule {

  token: string | null = localStorage.getItem('_token');
  almacen: string | null = localStorage.getItem('setAlmacen');

  @Mutation
  setAlmacen(almacen: string) {
    this.almacen = almacen;
  }

  	@Action
  	async saveSetting(dataSetting: Setting) { 
    await https.patch('/configuracionesgenerales/1', dataSetting,
		{
			headers: {
			"Content-type": "application/vnd.api+json",
			"Accept" : 'application/vnd.api+json'
			}
		})
		.then((payload: any) => {
			if (payload) {
			if (payload.status === 200) {
				
			}
			} 
		})
		.catch((e) => {
		
		});
    	return dataSetting;
  	}

	  
  	@Action
  	async saveLogoSetting(LogoSetting: any) { 
		let formData = new FormData();
		formData.append('logo', LogoSetting);
 	 	const response =  await https.post('/configuracionesgenerales/1/upload', formData,
		{
		headers: {
			'Content-Type': 'multipart/form-data'	
		} 
		})
		if (response.status === 201){
			return console.log(response)
		} 
	}
  	@Action
  	getAlmacenAll() {
    	return new Promise((resolve, reject) => {
      	http.get('/almacenes')
        .then(response => {
          console.log(response)
          	if (response.status === 200) {
				  
				let item : any = [];
        		item = deserialize(response.data,{changeCase:'camelCase'})
					/*response.data.data.map(function (value:any, key:any) {
					item.push(value.attributes);		
					});  */
				resolve(item);
            	
          	}

        })
        .catch(error => {

          reject(error)
        })
    })
  }
  @Action
  	getConfiguraciones() {
		return new Promise((resolve, reject) => {
      https.get('/configuracionesgenerales')
      .then(response => {

        if (response.status === 200) {
          let item : any = [];
          item = deserialize(response.data)
          resolve(item);
        }

      })
      .catch(error => {

        reject(error)
      })
	})
	}
  
}
export default getModule(settingModule);
