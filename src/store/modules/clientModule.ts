import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { Cliente } from '../interfaces/Cliente';
  import { UserToken } from '../interfaces/UserToken';
  import { http } from '@/utils/http';
  import { deserialize } from 'jsonapi-fractal'
  
  @Module({
    namespaced: true,
    name: 'Cliente',
    store,
    dynamic: true,
  })
  
  class clientModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');
    cliente: Object | null = localStorage.getItem('setClientes');
  
 
  
    @Action
        getClientesAll() {
          return new Promise((resolve, reject) => {
            http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            http.get('/clientes?sort=-id')
          .then(response  => {
      
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
		getClientById(id:number) {
			return new Promise((resolve, reject) => {
				http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
				http.get(`clientes/${id}`)
				.then(response => {
					if (response.status === 200) {   
						let editcliente : any = [];
						editcliente = deserialize(response.data)
						resolve(editcliente);
					}
				})
			})
		}
    @Action
      getZonasAll(){
        return new Promise((resolve, reject) => {
          http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
          http.get('/zonas')
        .then(response => {
     
              if (response.status === 200) {      
                let zonas : any = [];
                zonas = deserialize(response.data,{changeCase:'camelCase'})
                resolve(zonas);
                
              }
        })
        .catch(error => {
          reject(error)
        })
      })
      }
    @Action
      	getTipoClienteAll(){
			return new Promise((resolve, reject) => {
			http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
			http.get('/tiposclientes')
			.then(response => {
		
				if (response.status === 200) {      
					let tipoclientes : any = [];
					tipoclientes = deserialize(response.data,{changeCase:'camelCase'})
					resolve(tipoclientes);
					
				}
			})
			.catch(error => {
			reject(error)
			})
		})
      }
    @Action
      	getSegmentosAll(){
			return new Promise((resolve, reject) => {
			http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
			http.get('/segmentos')
			.then(response => {
		
				if (response.status === 200) {      
					let segmentos : any = [];
					segmentos = deserialize(response.data,{changeCase:'camelCase'})
					resolve(segmentos);
					
				}
			})
			.catch(error => {
			reject(error)
			})
		})
      }
    @Action
      	getVendedorAll(){
			return new Promise((resolve, reject) => {
			http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
			http.get('/vendedores')
			.then(response => {
	
				if (response.status === 200) {      
					let vendedores : any = [];
					vendedores = deserialize(response.data,{changeCase:'camelCase'})
					resolve(vendedores);
					
				}
			})
			.catch(error => {
			reject(error)
			})
		})
      }
    @Action
		getCondicionesPagoAll(){
			return new Promise((resolve, reject) => {
			http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
			http.get('/condicionespagos')
			.then(response => {
		
				if (response.status === 200) {      
					let condicionespagos : any = [];
					condicionespagos = deserialize(response.data,{changeCase:'camelCase'})
					resolve(condicionespagos);
					
				}
			})
			.catch(error => {
				reject(error)
			})
			})
		}
    @Action
		async saveClient(dataClient: Cliente) { 
		http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.post('/clientes', dataClient,
			{
			headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
			}
			})
			if (response.status === 201){
				return await this.getClientesAll();
			}
		}  
    @Action({rawError: true})
		async updateClient(dataClient:Cliente) { 
			let data : Cliente = deserialize(dataClient,{changeCase:'camelCase'});
			let id = data.id
			http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.patch(`clientes/${id}`, dataClient,
			{
				headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
				}
			})
			if (response.status === 200 || response.status === 201){
				return await this.getClientesAll();
			}
		}  
    @Action({rawError: true})
		async deleteCliente(dataClient : any) { 
		let data : any  = deserialize(dataClient,{changeCase:'camelCase'});
		let id = data.id
		http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.patch(`clientes/${id}`, dataClient,
			{
			headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
			}
			})
			if (response.status === 200 || response.status === 201){
				return await this.getClientesAll();
			}
		}  

	  @Action
	  async saveUsuarioCliente(dataCliente: any) { 
	  http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
	  const response =  await http
		  .post('usuario/asignar', dataCliente,
		  {
		  headers: {
			  "Content-type": "application/vnd.api+json",
			  "Accept" : 'application/vnd.api+json'
		  }
		  })
		  if (response.status === 201){
			  
		  }
	  }
  }  
  
  export default getModule(clientModule);
  