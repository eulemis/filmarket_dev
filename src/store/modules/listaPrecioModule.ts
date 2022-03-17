import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { ListaPrecio } from '../interfaces/ListaPrecio';
  import { UserToken } from '../interfaces/UserToken';
  import { http } from '@/utils/http';
  import { deserialize } from 'jsonapi-fractal'
  
  @Module({
    namespaced: true,
    name: 'Lista Precio',
    store,
    dynamic: true,
  })
  
  class ListaPreciosModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');
    contacto: Object | null = localStorage.getItem('setContactos');
  
 
  
    @Action
        getListaPreciosAll() {
          return new Promise((resolve, reject) => {
            http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            http.get(`/listaprecios?page[number]=1&sort=-id`)
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
		getListaPrecioById(id:number) {
			return new Promise((resolve, reject) => {
				http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
				http.get(`listaprecios/${id}`)
				.then(response => {
					if (response.status === 200) {   
						let editcontacto : any = [];
						editcontacto = deserialize(response.data)
						console.log(editcontacto)
						resolve(editcontacto);
					}
				})
			})
		}

    @Action
		async saveListaPrecio(dataLista: ListaPrecio) { 
		http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.post('/listaprecios', dataLista,
			{
			headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
			}
			})
			if (response.status === 201){
				return await this.getListaPreciosAll();
			}
		}  
    @Action({rawError: true})
		async updateListaPrecio(dataClient:ListaPrecio) { 
			let data : ListaPrecio = deserialize(dataClient,{changeCase:'camelCase'});
			let id = data.id
			http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.patch(`listaprecios/${id}`, dataClient,
			{
				headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
				}
			})
			if (response.status === 200 || response.status === 201){
				return await this.getListaPreciosAll();
			}
		}  
    @Action({rawError: true})
		async deleteListaPrecio(dataClient : any) { 
		let data : any  = deserialize(dataClient,{changeCase:'camelCase'});
		let id = data.id
		http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.patch(`listaprecios/${id}`, dataClient,
			{
			headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
			}
			})
			if (response.status === 200 || response.status === 201){
				return await this.getListaPreciosAll();
			}
		}  
		
	@Action
        getMonedas() {
          return new Promise((resolve, reject) => {
            http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            http.get('/monedas?sort=-id')
          .then(response => {
      
                if (response.status === 200) {      
                  let monedas : any = [];
                  monedas = deserialize(response.data,{changeCase:'camelCase'})
        
                  resolve(monedas);
                  
                }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }  
  
  export default getModule(ListaPreciosModule);
  