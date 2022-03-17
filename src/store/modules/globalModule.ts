import {
    getModule,
    Module,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { http } from '@/utils/http';
  import { deserialize } from 'jsonapi-fractal'
  import storageData from '@/store/services/storageService'
  import sessionModule from '@/store/modules/sessionModule';
  
  @Module({
    namespaced: true,
    name: 'global',
    store,
    dynamic: true,
  })
  
  class globalModule extends VuexModule {
  
    token = sessionModule.getTokens;

	@Action
	    getFilterSearch(data:any) {
			return new Promise((resolve, reject) => {
			  http.defaults.headers.common['Authorization'] =  this.token;
        if (data.endpoint == 'contactos' ) {
          http.get(`/${data.endpoint}?include=clientes&filter[${data.filter}]=${data.query}&sort=-id`)
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
        } else {
          http.get(`/${data.endpoint}?filter[${data.filter}]=${data.query}&sort=-id`)
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
        }

		})
	  }
	  @Action
	  dataPaginate(data:any) {
         return new Promise((resolve, reject) => {
            if (data.endpoint == 'contactos') {
                http.get('/contactos',{
					headers: {
						"Accept" : 'application/vnd.api+json'
					}	
				})  
                .then(response =>  {

				if (response.status === 200) {     
					resolve(response);
				}
            })
            .catch(error => {
                reject(error)
            })
            } else {
  
                http.get(`/${data.endpoint}?page[number]=${data.page}&page[size]=${data.itemsPerPage}&sort=-id`)
                .then(response =>  {

                        if (response.status === 200) {     
                            resolve(response);
                        }
                })
                .catch(error => {
                    reject(error)
                })
            } 
         
            }) 
	     }

  }  
  
  export default getModule(globalModule);
  