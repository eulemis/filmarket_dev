<template>
    <v-row>
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
                                v-for="(product, index) in this.selectOrder"
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
                                                :src="product.imgUrl"
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
                                                    ${{
                                                        product.price *
                                                            product.qty
                                                    }}
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
                                <v-card-title>Options</v-card-title>
                                <v-card-text>
                                    <div
                                        class="d-flex justify-space-between mb-3"
                                    >
                                        <h6 class="text--disabled">Coupons</h6>
                                        <a href="#">Apply</a>
                                    </div>
                                    <v-divider></v-divider>
                                    <div class="mt-3">
                                        <h6 class="text--disabled">
                                            Price Details
                                        </h6>

                                        <div
                                            class="d-flex justify-space-between"
                                        >
                                            <p
                                                class="text--disabled mb-1 text-18 mr-2"
                                            >
                                                Total :
                                            </p>
                                            <p
                                                class="text--disabled mb-1 text-18"
                                            >
                                                $500
                                            </p>
                                        </div>
                                        <div
                                            class="d-flex justify-space-between"
                                        >
                                            <p
                                                class="text--disabled mb-1 text-18 mr-2"
                                            >
                                                Bag Discount:
                                            </p>
                                            <p
                                                class="text-success mb-1 text-18"
                                            >
                                                -$15
                                            </p>
                                        </div>
                                        <div
                                            class="d-flex justify-space-between"
                                        >
                                            <p
                                                class="text--disabled mb-1 text-18 mr-2"
                                            >
                                                Estimnated Tax:
                                            </p>
                                            <p
                                                class="text-success mb-1 text-18"
                                            >
                                                $10
                                            </p>
                                        </div>
                                        <div
                                            class="d-flex justify-space-between"
                                        >
                                            <p
                                                class="text--disabled mb-1 text-18 mr-2"
                                            >
                                                EMI Eligibility:
                                            </p>
                                            <p
                                                class="text-success mb-1 text-18"
                                            >
                                                <a href="#">Details</a>
                                            </p>
                                        </div>
                                        <div
                                            class="d-flex justify-space-between"
                                        >
                                            <p
                                                class="text--disabled mb-1 text-18 mr-2"
                                            >
                                                Delivery Charges:
                                            </p>
                                            <p
                                                class="text-success mb-1 text-18 "
                                            >
                                                Free
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

                            <div class="panel_white">
                                <v-card-text>
                                    <div
                                        class="d-flex align-center flex-wrap mb-2"
                                    >
                                        <v-icon color="" class="pa-1 mr-2"
                                            >mdi-shield-check</v-icon
                                        >
                                        <p class="ma-0">
                                            Safe and Secure Payment
                                        </p>
                                    </div>
                                    <div
                                        class="d-flex align-center flex-wrap mb-2"
                                    >
                                        <v-icon color="" class="pa-1 mr-2"
                                            >mdi-bus</v-icon
                                        >
                                        <p class="ma-0">
                                            Safe and Secure Payment
                                        </p>
                                    </div>
                                    <div
                                        class="d-flex align-center flex-wrap mb-2"
                                    >
                                        <v-icon color="" class="pa-1 mr-2"
                                            >mdi-reload</v-icon
                                        >
                                        <p class="ma-0">Refund Policy</p>
                                    </div>
                                </v-card-text>
                            </div>
                        </v-col>
                    </v-row>
                </tab-content>
        
            </form-wizard>
        </v-col>
    </v-row>
</template>
<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
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
    get getCartOrder() {
        return orderModule.getCartList; 
    }

       get FormRequest(): Object {
        return serialize(this.selectOrder,'pedidos',{});
    }
    get totalAmount() {
        let total = 0
        return (total += this.selectOrder.reduce(
            (left, cur:any) => left + cur.price * cur.qty,
            0
        ))
    }
    deleteCart(cart:any) {
        this.selectOrder.splice(this.selectOrder.indexOf(cart), 1)
        storageData.set('_dataSelect',this.selectOrder)
    }
    onComplete() {
           console.log('holaaa:: ' + this.FormRequest)
       this.savePedido()
    }
    async savePedido() {
             
	  //  this.overlay = true
    	const data = await orderModule.savePedido(this.FormRequest)
       // this.textmsj = 'Pedido Creado con Éxito.'
        //this.color = 'success'
       // this.snackbar = true
        //this.back();
		//this.overlay = false 
    }
    mounted(){
        let orderDB = storageData.get('_dataSelect')
        if (orderDB === null) {
            this.selectOrder = []
        } else {
            this.selectOrder = orderDB
        }
       
    }

}
</script>
<style lang="scss" scoped>
    .panel_white{
        background: white;
        border-radius: 6px;
    }
</style>
