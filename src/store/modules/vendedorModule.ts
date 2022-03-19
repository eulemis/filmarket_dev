import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { Vendedor } from '../interfaces/Vendedor';
  import { UserToken } from '../interfaces/UserToken';
  import { http } from '@/utils/http';
  import { deserialize } from 'jsonapi-fractal'
  
  @Module({
    namespaced: true,
    name: 'Vendedor',
    store,
    dynamic: true,
  })
  
  class vendedorModule extends VuexModule {
  
    token: string | null = localStorage.getItem('_token');
  
 
  
    @Action
        getVendedoresAll() {
          return new Promise((resolve, reject) => {
            http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            http.get(`/vendedores?page[number]=1&sort=-id`)
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
		getVendedorById(id:number) {
			return new Promise((resolve, reject) => {
				http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
				http.get(`vendedores/${id}`)
				.then(response => {
					if (response.status === 200) {   
						let editVendedor : any = [];
						editVendedor = deserialize(response.data)
						console.log(editVendedor)
						resolve(editVendedor);
					}
				})
			})
		}

	@Action
		getListaPreciosAll(){
			return new Promise((resolve, reject) => {
				http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
				http.get('/listaprecios')
			.then(response => {
		
					if (response.status === 200) {      
					let listaprecios : any = [];
					listaprecios = deserialize(response.data,{changeCase:'camelCase'})
					resolve(listaprecios);
					
					}
			})
			.catch(error => {
				reject(error)
			})
			})
		}

    @Action
		async saveVendedor(dataVendedor: Vendedor) { 
		http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.post('/vendedores', dataVendedor,
			{
			headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
			}
			})
			if (response.status === 201){
				return await this.getVendedoresAll();
			}
		}  
    @Action({rawError: true})
		async updateVendedor(dataVendedor:Vendedor) { 
			let data : Vendedor = deserialize(dataVendedor,{changeCase:'camelCase'});
			let id = data.id
			http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.patch(`vendedores/${id}`, dataVendedor,
			{
				headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
				}
			})
			if (response.status === 200 || response.status === 201){
				return await this.getVendedoresAll();
			}
		}  
    @Action({rawError: true})
		async deleteVendedor(dataVendedor : any) { 
		let data : any  = deserialize(dataVendedor,{changeCase:'camelCase'});
		let id = data.id
		http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
		const response =  await http
			.patch(`vendedores/${id}`, dataVendedor,
			{
			headers: {
				"Content-type": "application/vnd.api+json",
				"Accept" : 'application/vnd.api+json'
			}
			})
			if (response.status === 200 || response.status === 201){
				return await this.getVendedoresAll();
			}
		}  
  }  
  
  export default getModule(vendedorModule);
  