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
  import { http, https } from '@/utils/http';
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
    @Action
		async updateArticulo(data:any) { 
		 	const response =  await http.post(`productofotos/${data.id}/upload`, data.formdata,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			console.log(response)
			if (response.status === 200 || response.status === 201){
				return response;
			} 
		} 
	@Action
		async getArticuloWithFotoById(id:number){
			return new Promise((resolve, reject) => {
				http.get(`productofotos/${id}`)
				.then(response => {
					if (response.status === 200) {  
						resolve(response); 
					}
				})
			})	
		}		
  }  
  
  export default getModule(articuloModule);
  