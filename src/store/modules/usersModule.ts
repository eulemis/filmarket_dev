import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { Usuarios } from '../interfaces/Usuarios';
  import { UserToken } from '../interfaces/UserToken';
  import { http } from '@/utils/http';
  import { deserialize } from 'jsonapi-fractal'
  
  @Module({
    namespaced: true,
    name: 'Usuarios',
    store,
    dynamic: true,
  })
  
  class usuariosModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');
  
    @Action
		async saveUsuarioAdmin(dataAdmin: Usuarios) { 
		const response =  await http
			.post('usuario/crearadmin', dataAdmin,
			{
			headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
			}
			})
			if (response.status === 201){
			
			}
		}  
    @Action
		async saveUsuarioCliente(dataCliente: Usuarios) { 
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
    @Action
		async saveUsuarioVendedor(dataVendedor: any) { 
			console.log(dataVendedor)
		const response =  await http
			.post('/usuario/asignar', dataVendedor,
			{
			headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
			}
			})
			if (response.status === 200 || response.status === 201){
				return response
			}
		}

	@Action
		getFilterSearch(data:any) {
			return new Promise((resolve, reject) => {
			http.get(`/vendedores?filter[${data.filter}]=${data.query}&sort=-id`)
				.then(response =>  {
			
					if (response.status === 200) {      
						let search : any = [];
						search = deserialize(response.data)
						resolve(search);
					}
				})
				.catch(error => {
				reject(error)
				})
			})
		}
		@Action
		async dataPaginate(page:number) {
		  return new Promise((resolve, reject) => {
			  http.get(`/vendedores?page[number]=${page}&sort=-id`)
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
  }  
  
  export default getModule(usuariosModule);
  