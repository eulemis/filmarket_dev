import {
    getModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    VuexModule,
  } from 'vuex-module-decorators';
  import store from '@/store';
  import { Pedidos } from '../interfaces/Pedidos';
  import { Cotizacion } from '../interfaces/Cotizacion';
  import storageData from '@/store/services/storageService'
  import { serialize, deserialize } from 'jsonapi-fractal'
  import { http } from '@/utils/http';  
  @Module({
    namespaced: true,
    name: 'Orders',
    store,
    dynamic: true,
  })
  
  class orderModule extends VuexModule {
    token: string | null = localStorage.getItem('_token');
    items : any = [];
    productos : any = {};
    //getters
    get getCartList() {
        return this.items
    }

    @Mutation
    ADD_CART(data:any) {

        let findId = this.items.find(product => product.id == data.id)
        if(findId) {
            data.qty += 1
        }else { 
            data.qty = 1
           
            const producto  =  {
                fecha: "2022-02-09 11:13:19",
                item:1,
                id_producto:"1",
                id_unidad:"1",
                id_almacen:"1",
                tipo_imp:"2",
                porcentaje_impuesto:"10.00",
                cantidad:0,
                monto_bruto_item: "10.0000",
                porcentaje_descuento_item: 1,
                monto_descuento_item: "10.0000",
                monto_iva_item: "10.0000",
                monto_exento_item: "10.0000",
                monto_neto_item: "10.0000",
                comentarios:"5555",
                estatus: "1",
                precio:data.precio,
                qty:1,
                id:data.id,
                id_pedido:0,
                id_cotizacion:0  
                }
            
            this.items.push(producto) 
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
            http.get(`productoselegibles?filter[id_cliente]=${id}`)
            .then(response => {
                if (response.status === 200) {   
                    resolve(response);
                }
            })
		})
	}
    @Action
    async saveOrderPedido(dataPedido: Pedidos) { 
    const response =  await http.post('/pedidos', dataPedido,
        {
        headers: {
            "Content-type": "application/vnd.api+json",
            "Accept" : 'application/vnd.api+json'
        }
        })
        if (response.status === 200 || response.status === 201 ){
            return response
        }
    
    } 
    @Action
    async saveOrderCotizacion(dataCotizacion: Cotizacion) { 
    const response =  await http.post('/cotizaciones', dataCotizacion,
        {
        headers: {
            "Content-type": "application/vnd.api+json",
            "Accept" : 'application/vnd.api+json'
        }
        })
        if (response.status === 200 || response.status === 201 ){
            return response
        }
    
    } 
    @Action
    async savePedidoDetalles(dataOrderDetalle : any) { 
    const response =  await http.post('/pedidosdetalles/bulk', dataOrderDetalle,
        {
        headers: {
            "Content-type": "application/vnd.api+json",
            "Accept" : 'application/vnd.api+json'
        }
        })
        if (response.status === 200 || response.status === 201 ){
           return response
        } 
    }  
    @Action
    async saveCotizacionDetalles(dataOrderDetalle : any) { 
   
    const response =  await http.post('/pedidosdetalles', dataOrderDetalle,
        {
        headers: {
            "Content-type": "application/vnd.api+json",
            "Accept" : 'application/vnd.api+json'
        }
        })
        if (response.status === 200 || response.status === 201 ){
           return response
        } 
    
    } 
    @Action
    getArticulosByFilter(filter:number){
		return new Promise((resolve, reject) => {
            http.get(`productoselegibles?filter[id_cliente]=${filter}`)
            .then(response => {
                if (response.status === 200) {   
                    resolve(response);
                }
            })
		})
	}
    @Action
    getArticulosVariusFilter(datafilter:any){
		return new Promise((resolve, reject) => {
            http.get(`productoselegibles?filter[id_cliente]=${datafilter.id_cliente}&${datafilter.filter}&page[number]=${datafilter.page}`)
            .then(response => {
                if (response.status === 200) {   
                    resolve(response);
                }
            })
		})
	}
    @Action
    getDataPaginateAticulos(datapaginate:any){
		return new Promise((resolve, reject) => {
            http.get(`productoselegibles?filter[id_cliente]=${datapaginate.id_cliente}&page[number]=${datapaginate.page}`)
            .then(response => {
                if (response.status === 200) {   
                    resolve(response);
                }
            })
		})
	}
    @Action
    getCategorias() {
        return new Promise((resolve, reject) => {
            http.get(`categorias`)
            .then(response => {
                if (response.status === 200) {   
                    let categorias : any = [];
                    categorias = deserialize(response.data)
                    resolve(categorias);
                }
            })
        })
    }
    @Action
    getLineas() {
        return new Promise((resolve, reject) => {
            http.get(`lineas`)
            .then(response => {
                if (response.status === 200) {   
                    let lineas : any = [];
                    lineas = deserialize(response.data)
                    resolve(lineas);
                }
            })
        })
    }
    @Action
    getSubLineas(id_linea) {
        return new Promise((resolve, reject) => {
            http.get(`sublineas?filter[id_linea]=${id_linea}`)
            .then(response => {
                if (response.status === 200) {   
                    let sublineas : any = [];
                    sublineas = deserialize(response.data)
                    resolve(sublineas);
                }
            })
        })
    }
    @Action
    getColors() {
        return new Promise((resolve, reject) => {
            http.get(`colores`)
            .then(response => {
                if (response.status === 200) {   
                    let colors : any = [];
                    colors = deserialize(response.data)
                    resolve(colors);
                }
            })
        })
    }
    @Action
    getProcedencias() {
        return new Promise((resolve, reject) => {
            http.get(`procedencias`)
            .then(response => {
                if (response.status === 200) {   
                    let procedencias : any = [];
                    procedencias = deserialize(response.data)
                    resolve(procedencias);
                }
            })
        })
    }
    @Action
    getPrecios() {
        return new Promise((resolve, reject) => {
            http.get(`precios`)
            .then(response => {
                if (response.status === 200) {   
                    let precios : any = [];
                    precios = deserialize(response.data)
                    resolve(precios);
                }
            })
        })
    }
    

  }
  export default getModule(orderModule);
