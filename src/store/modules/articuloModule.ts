import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { Contacto } from '../interfaces/Contacto';
  import { UserToken } from '../interfaces/UserToken';
  import { http } from '@/utils/http';
  import { deserialize } from 'jsonapi-fractal'
  
  @Module({
    namespaced: true,
    name: 'Articulos',
    store,
    dynamic: true,
  })
  
  class articuloModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');
    contacto: Object | null = localStorage.getItem('setproductos');
  
 
  
    @Action
        getArticulosAll() {
          return new Promise((resolve, reject) => {
            http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            http.get(`/productos?page[number]=1&sort=-id`)
          .then(response =>  {
      
                if (response.status === 200) {     
                  	resolve(response);
                }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
    @Action
		getArticuloById(id:number) {
			return new Promise((resolve, reject) => {
				http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
				http.get(`productos/${id}`)
				.then(response => {
					if (response.status === 200) {   
						let editarticulo : any = [];
						editarticulo = deserialize(response.data)
						console.log(editarticulo)
						resolve(editarticulo);
					}
				})
			})
		}

    @Action
		async saveArticulo(dataClient: Contacto) { 
		http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.post('/productos', dataClient,
			{
			headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
			}
			})
			if (response.status === 201){
				return await this.getArticulosAll();
			}
		}  
    @Action({rawError: true})
		async updateArticulo(dataClient:Contacto) { 
			let data : Contacto = deserialize(dataClient,{changeCase:'camelCase'});
			let id = data.id
			http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.patch(`productos/${id}`, dataClient,
			{
				headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
				}
			})
			if (response.status === 200 || response.status === 201){
				return await this.getArticulosAll();
			}
		}  
		
  }  
  
  export default getModule(articuloModule);
  