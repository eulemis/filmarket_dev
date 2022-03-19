import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import storageData from '@/store/services/storageService'
  import { deserialize } from 'jsonapi-fractal'
  import { http } from '@/utils/http';  
  @Module({
    namespaced: true,
    name: 'Orders',
    store,
    dynamic: true,
  })
  
  class orderModule extends VuexModule {
    token: string | null = localStorage.getItem('_token');
    items: any[] = [];
    //getters
    get getCartList() {
        return /* ( storageData.get('_dataSelect')) ? storageData.get('_dataSelect') :  */this.items
    }

    @Mutation
    ADD_CART(data:any) {
        let findId = this.items.find(product => product.id == data.id)
        
        if(findId) {
            data.qty += 1
        }else { 
            data.qty = 1
            this.items.push(data) 
            storageData.set('_dataSelect',this.items)
               
        }
    }

    @Action
    addCart(data:any) {
        this.ADD_CART(data)
    }
    @Action
    getArticulosByCliente(id:number){
		return new Promise((resolve, reject) => {
            http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            http.get(`productoselegibles`)
            .then(response => {
                if (response.status === 200) {   
                    let listarArticulos : any = [];
                    listarArticulos = deserialize(response.data)
                    resolve(listarArticulos);
                }
            })
		})
	}
    @Action
    async savePedido(dataPedido: Object) { 
    http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
    const response =  await http
        .post('/pedidos', dataPedido,
        {
        headers: {
            "Accept" : 'application/vnd.api+json'
        }
        })
    
    }  
    

  }
  export default getModule(orderModule);
