<template>
    <v-row>
        <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
          <TitleSection :sectiontitle="sectiontitle"/>
        <v-col cols="12" md="12">
            <form-wizard
                class="test"
                shape="tab"
                title=""
                subtitle=""
                color="#0081FF"
                next-button-text="Ver Pedido"
                finish-button-text="Enviar Pedido"
                @on-complete="onComplete" 
            >
                <tab-content title="Artículos Seleccionados" icon="mdi mdi-cart-outline">
                    <v-row>
                        <v-col cols="12" md="8">
                            <div
                                v-for="(product, index) in this.getCartOrder"
                                :key="index"
                                class="mb-3 panel_white"
                            >
                                <v-card-text>
                                    <div
                                        class="d-flex align-center justify-space-between flex-wrap"
                                    >
                                        <div class="d-flex flex-wrap">
                                            <v-img
                                                class="mr-2"
                                                :src="product.foto"
                                                alt=""
                                                max-width="200"
                                                max-height="200"
                                            ></v-img>
                                            <div>
                                                <h5 class="font-weight-thin">
                                                    {{ product.title }}
                                                </h5>
                                                <v-chip
                                                    class="mb-4"
                                                    color="success"
                                                    small
                                                    text-color="white"
                                                >
                                                    In Stock
                                                </v-chip>
                                                <p class="mb-0 text-18">
                                                    ${{product.precio * product.qty}}
                                                </p>
                                                <div class="mb-5">
                                                    <p class="text--disabled">
                                                        <v-icon
                                                            small
                                                            color="gray"
                                                            >mdi-cart</v-icon
                                                        >
                                                        Free SHipping
                                                    </p>
                                                    <p>
                                                        Quantity
                                                        {{ product.qty }}
                                                    </p>
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <v-btn-toggle
                                              
                                                mandatory
                                                tile
                                                class="d-flex align-center"
                                            >
                                                <div>
                                                    <v-btn
                                                        @click="deleteCart(product)" 
                                                        class="mr-2 danger--text"
                                                        small
                                                        depressed
                                                        color="danger lighten-5"
                                                    >
                                                        <v-icon
                                                            left
                                                            color="danger"
                                                            >mdi-close</v-icon
                                                        >
                                                        Remove
                                                    </v-btn>
                                                    <v-btn
                                                    style="display:none"
                                                        depressed
                                                        small
                                                        class="primary--text"
                                                        color="primary lighten-5"
                                                    >
                                                        <v-icon
                                                            left
                                                            color="primary"
                                                            >mdi-heart-outline</v-icon
                                                        >
                                                        Wishlist
                                                    </v-btn>
                                                </div>
                                            </v-btn-toggle>
                                        </div>
                                    </div>
                                </v-card-text>
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="mb-3 panel_white">
                                <v-card-title>Resumen Pedido</v-card-title>
                                <v-card-text>
                                    <div
                                        class="d-flex justify-space-between mb-3"
                                    >
                                     
                                    </div>
                                    <v-divider></v-divider>
                                    <div class="mt-3">
                                        <h6 class="text--disabled">
                                           Detalle de Precio
                                        </h6>

                                        <div
                                            class="d-flex justify-space-between"
                                        >
                                            <p
                                                class="text--disabled mb-1 text-18 mr-2"
                                            >
                                                Sub Total :
                                            </p>
                                            <p
                                                class="text--disabled mb-1 text-18"
                                            >
                                             $ {{ totalAmount }}
                                            </p>
                                        </div>
                                        <v-divider class="my-3"></v-divider>

                                        <div
                                            class="d-flex justify-space-between"
                                        >
                                            <h6
                                                class=" font-weight-bold mb-1 text-18 mr-2"
                                            >
                                                Total:
                                            </h6>
                                            <h6 class=" mb-1 text-18">
                                                $ {{ totalAmount }}
                                            </h6>
                                        </div>
                                    </div>
                                </v-card-text>
                            </div>
                        </v-col>
                    </v-row>
                </tab-content>
            </form-wizard>
            <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
        </v-col>
    </v-row>
</template>
<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
import sessionModule from '@/store/modules/sessionModule';
import orderModule            from '@/store/modules/orderModule';
import storageData from '@/store/services/storageService'
import {serialize, deserialize } from 'jsonapi-fractal'


@Component({
  components: {
   
  }
})
export default class ProcesarPago extends Vue {
  
    items = ['Home', 'Office']
    subTotal = null
    sectiontitle = ''
    selectOrder : any = []
    Order : any = {}
    overlay = false;
    snackbar = false
    textmsj = ''
    color = ''
    dataSetting : any = []
    get getCartOrder() {
        return orderModule.getCartList; 
    }
    get settingConfig() : any {
        return sessionModule.getSetting; 
    }
    get totalAmount() {
        let total = 0
        return (total += this.getCartOrder.reduce(
            (left, cur:any) => left + cur.precio * cur.qty,
            0
        ))
    }
    get totalDescuento() {
        let total = 0
        return (total += this.getCartOrder.reduce(
            (left, cur:any) => left + cur.monto_descuento * cur.qty,
            0
        ))
    }
    get FormRequestPedido(): any {
        return serialize(this.Order,'pedidos',{});
    }

    get FormRequestCotizacion(): any {
        return serialize(this.Order,'cotizaciones',{});
    }


    get FormRequestOrderDetalle() : any {
        return serialize(this.getCartOrder,'pedidosdetalles',{});
    }
    deleteCart(cart:any) {
        this.getCartOrder.splice(this.getCartOrder.indexOf(cart), 1)
        storageData.set('_dataSelect',this.getCartOrder)
    }
    async onComplete() {
       
        if (this.dataSetting.tipo_documento == 'pedido') {
            this.orderPedido()
        } else {
            this.orderCotizacion()
        } 

    }
saveOrderPedido
    async orderPedido(){
        //this.overlay = true
        const data : any = await orderModule.saveOrderPedido(this.FormRequestPedido)
        if (data.status == 201) {
            let i = 0
            for (i=0; i < this.getCartOrder.length; i++) {
                if (this.dataSetting.tipo_documento == 'pedido') {
                    this.getCartOrder[i].id_pedido = data.data.data.id
                } 
            };
        }      
        const dataDetalle : any = await orderModule.savePedidoDetalles(this.FormRequestOrderDetalle)
        this.textmsj = 'Pedido Creado con Éxito.'
        this.color = 'success'
        this.snackbar = true
        this.back();
		this.overlay = false  
    }

    async orderCotizacion(){
        //this.overlay = true
        const data : any = await orderModule.saveOrderCotizacion(this.FormRequestCotizacion)
        if (data.status == 201) {
            let i = 0
            for (i=0; i < this.getCartOrder.length; i++) {
                if (this.dataSetting.tipo_documento == 'cotizacion') {
                    this.getCartOrder[i].id_pedido = data.data.data.id
                }                 
            };
        } 
      /* 
        const dataDetalle : any = await orderModule.saveCotizacionDetalles(this.FormRequestOrderDetalle)
        this.textmsj = 'Cotización Creada con Éxito.'
        this.color = 'success'
        this.snackbar = true
        this.back();
		this.overlay = false  */ 
    }

    back() {
        setTimeout(() => {
            this.$router.push({ name: "listapedidos"});
            this.snackbar = false
        },2000);
    }

    currentDate() {
        var date = new Date();
        return  date.toISOString();
    }
    mounted(){
        this.dataSetting = this.settingConfig 
        let orderDB = storageData.get('_dataSelect')
        if (orderDB === null) {
            this.selectOrder = []
        } else {
            this.selectOrder = orderDB
        }
        this.Order = {
            co_pedido: "0",
            co_cotizacion: "0",
            fecha:  "2022-02-09 11:13:19",
            status: "0",
            porcentaje_descuento: "40.00",
            monto_bruto: this.totalAmount,
            monto_descuento: (this.totalAmount * 40.00) / 100 ,
            monto_iva: "20",
            monto_exento: "10",
            monto_neto: "25",
            tasa: "15",
            direccion_entrega:  this.$route.params.direccion,
            comentarios:"",
            estatus: "1",
            id_cliente: this.$route.params.id_cliente,
            id_condiciones_pagos: this.$route.params.id_condiciones_pagos,
            id_vendedor: "1",//si el usuario es vendedor entonces se usa su id sino el id_vendedor del cliente
            id_sucursal: "1", // ?
            id_moneda: "1", // ?
            id_transporte: "1", // ?
            precio:"30.00",
            qty:0
        }
        orderDB.map(function (value:any, key:any) {
       	
        });  

    }

}
</script>
<style lang="scss" scoped>
    .panel_white{
        background: white;
        border-radius: 6px;
    }
</style>
