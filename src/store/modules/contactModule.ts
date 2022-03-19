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
    name: 'Contacto',
    store,
    dynamic: true,
  })
  
  class contactModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');
    contacto: Object | null = localStorage.getItem('setContactos');
  
 
  
    @Action
        getContactosAll() {
          return new Promise((resolve, reject) => {
            http.get(`/contactos?include=clientes&page[number]=1&sort=-id`)
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
		getContactById(id:number) {
			return new Promise((resolve, reject) => {
				http.get(`contactos/${id}`)
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
		async saveContact(dataClient: Contacto) { 
		http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.post('/contactos', dataClient,
			{
			headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
			}
			})
			if (response.status === 201){
				return await this.getContactosAll();
			}
		}  
    @Action({rawError: true})
		async updateContact(dataClient:Contacto) { 
			let data : Contacto = deserialize(dataClient,{changeCase:'camelCase'});
			let id = data.id
			http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.patch(`contactos/${id}`, dataClient,
			{
				headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
				}
			})
			if (response.status === 200 || response.status === 201){
				return await this.getContactosAll();
			}
		}  
    @Action({rawError: true})
		async deleteContacto(dataClient : any) { 
		let data : any  = deserialize(dataClient,{changeCase:'camelCase'});
		let id = data.id
		http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.patch(`contactos/${id}`, dataClient,
			{
			headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
			}
			})
			if (response.status === 200 || response.status === 201){
				return await this.getContactosAll();
			}
		}  
		
	@Action
        getClientes() {
          return new Promise((resolve, reject) => {
            http.get('/clientes?sort=-id')
          .then(response => {
      
                if (response.status === 200) {      
                  let client : any = [];
                  client = deserialize(response.data,{changeCase:'camelCase'})
        
                  resolve(client);
                  
                }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  	@Action
    	getFiltersCliente(query:any) {
			return new Promise((resolve, reject) => {
			http.get(`/clientes?filter[razon_social]=${query}`)
			.then(response =>  {
	
				if (response.status === 200) {      
					let search : any = [];
					search = deserialize(response.data,{changeCase:'camelCase'})
					resolve(search);
				}
			})
			.catch(error => {
				reject(error)
			})
		})
	}

  }  
  
  export default getModule(contactModule);
  