<template>
    <div style="padding:2%" class="order">
        <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <TitleSection :sectiontitle="sectiontitle"/>
        <form-wizard
        class="test"
        shape="tab"
        title=""
        subtitle=""
        color="#0081FF"
        back-button-text="Atras"
        next-button-text="Siguiente"
        finish-button-text="Ver Pedido"
        @on-complete="openDrawer"
        >
            <tab-content title="Datos del Cliente" icon="mdi mdi-account">
                <v-col cols="12" sm="6" md="6">
                    <v-autocomplete
                    v-model="query"
                    :items="items"
                    :loading="isLoading"
                    item-text="razonSocial"
                    item-value="id"
                    label="Cliente"
                    placeholder="Buscar Cliente"
                    dense
                    outlined
                    append-icon="mdi-account-search"
                    @change="getClienteAndArticulos($event)"
                    @click:append="searchClientes()"
                    @keyup.enter="searchClientes()"
                    :search-input.sync="search"
                    hide-no-data
                    hide-selected
                    ></v-autocomplete>
                    <v-expand-transition>
                        <v-list v-if="model" style="display:none">
                            <v-list-item
                            v-for="(field, i) in dataSearchCliente"
                            :key="i"
                            >
                            </v-list-item>
                        </v-list>
                    </v-expand-transition>
                </v-col>
                <v-col
                cols="12"
                sm="12"
                md="12"
                >
                <v-textarea
                    label="Direccion Entrega"
                    placeholder="Direccion Entrega"
                    outlined
                    dense
                    v-model="direccion_entrega"
                    rows="3"
                ></v-textarea>
                </v-col>
            </tab-content>
            <tab-content title="Lista de Articulos"  icon="mdi mdi-cart-outline">
                <v-row>
                    <v-col cols="12" md="12">
                        <v-card-text class="pa-0 pr-3 align-center panel_white" >
                            <div class="d-flex justify-space-between align-center flex-wrap">
                                <div>
                                    <v-toolbar flat class="pl-0">
                                        <v-autocomplete
                                            clearable
                                            class="mx-0 pl-0 elevation-0"
                                            hide-no-data
                                            hide-details
                                            filled
                                            dense
                                            label="Search..."
                                            solo
                                            elevation="0"
                                        ></v-autocomplete>
                                    </v-toolbar>
                                </div>
                                <div class="pa-lg-3 pa-sm-0">
                                    <v-badge
                                    v-if="cartCount >= 1"
                                    color="primary"
                                    :content="cartCount"
                                    overlap
                                    class="mr-4">
                                    <v-btn
                                        class="white--text mr-2"
                                        color="primary"
                                        small
                                        outlined
                                        depressed
                                        @click="openDrawer()">
                                        <v-icon>mdi-cart-outline</v-icon>
                                    </v-btn>
                                    </v-badge>
                                    <v-btn
                                        class="mr-2"
                                        small
                                        outlined
                                        color="primary"
                                        @click="gridView">
                                        <v-icon>mdi-view-grid</v-icon>
                                    </v-btn>
                                    <v-btn
                                        small
                                        dark
                                        color="danger"
                                        @click="listView">
                                        <v-icon>mdi-view-list-outline</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="3">
                        <v-row>
                            <v-col cols="12" md="12">
                                <div class="panel_white">
                                    <v-card-title>
                                        <div class="card-title mb-0">Filtros</div>
                                    </v-card-title>
                                    <v-card-text>
                                        <div class="d-flex justify-space-between align-center">
                                         <FiltrosProductos  
                                         v-on:getFilterOrder="filterCategory"
                                         v-on:getArticulosRefresh="refreshArticulos"
                                         />
                                        </div>
                                    </v-card-text>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" lg="9">
                        <v-row>
                            <v-col
                                v-for="(product, index) in filterProductList"
                           
                                :key="index"
                                cols="12"
                                :class="{'col-lg-4 col-md-6 col-sm-6': !isListView, 'col-md-12': isListView}">
                                <div class="overflow-hidden panel_white">
                                    <div
                                        class=""
                                        :class="{
                                            'list-grid': isListView,
                                            'list-horizontal': !isListView,
                                            'd-xs-block d-md-flex d-xl-flex d-lg-flex flex-row': isListView
                                        }"
                                    >
                                        <img
                                            class=""
                                            :class="{
                                                'object-contain h-64 w-full': !isListView,
                                                'object-contain   pa-3': isListView
                                            }"
                                            :src="product.foto"
                                            :height="!isListView ? 150 : ''"
                                            :width="isListView ? 128 : ''"
                                            @click="verDetallesArticulo(product.id)"
                                        />

                                        <v-card-text
                                            :class="{
                                                'align-self-center flex-grow-1 d-xs-block d-md-flex d-lg-flex d-xl-flex justify-space-between align-center': isListView
                                            }"
                                        >
                                            <p class="text-18 ma-0 ">
                                                <a href="#" class="text--primary">
                                                    {{ product.descripcion }}
                                                </a>
                                            </p>
                                            <p
                                                :class="{
                                                    'mb-0  mx-sm-0 mx-md-3 mx-lg-3 mx-xl-3': isListView
                                                }"
                                                class="body-2 text--disabled font-weight-thin"
                                            >
                                                {{ product.descripcion }}
                                            </p>
                                            <div
                                                :class="{
                                                    'mb-sm-0  mx-md-4 mx-lg-4 mx-xl-4  py-xs-3 py-3 py-md-0': isListView,
                                                    'mb-5': !isListView
                                                }"
                                                class="d-flex flex-wrap align-center justify-space-between "
                                            >
                                                <div
                                                v-if="dataSetting.ver_stock_art != 0"
                                                    class="font-weight-bold text-18"
                                                    :class="{
                                                        'ml-4': isListView
                                                    }"
                                                >
                                                   Stock : {{ product.stockdisponible_p }}
                                                </div>
                                            
                                                <div
                                                    class="font-weight-bold text-18"
                                                    :class="{
                                                        'ml-4': isListView
                                                    }"
                                                >
                                                    ${{ product.precio }}
                                                </div>
                                            </div>

                                            <div
                                                :class="{
                                                    'justify-space-between  flex-wrap': !isListView,
                                                    'justify-end': isListView
                                                }"
                                                class="d-flex"
                                            >
                                            <v-btn 
                                            v-if="product.qty >= 1"
                                            @click="openDrawer()"
                                            small 
                                            class="mr-1 mb-1 primary lighten-5 primary--text"
                                            >View Cart
                                            </v-btn>
                                            <v-btn 
                                            v-else
                                            @click="addCartx(product)"
                                            small 
                                            class="mr-1 mb-1 primary lighten-5 primary--text"
                                            >Add Cart
                                            </v-btn>
                            
                                            </div>
                                        </v-card-text>
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <v-pagination
                                v-model="pagination.current_page"
                                :length="paginate"
                                @input="next">
                                circle
                                </v-pagination>
                            </v-col>
                            <div>
                                <v-navigation-drawer
                                    v-model="cartDrawer"
                                    fixed
                                    right
                                    height="100%"
                                    temporary
                                    floating
                                    width="450">
                                    <cart-drawer v-on:updateCount="updateCount">
                                        <template v-slot:cartDrawerCloseButton>
                                            <v-btn
                                                icon
                                                color
                                                @click.stop="cartDrawer = !cartDrawer"
                                            >
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </template>
                                    </cart-drawer>
                                    <template v-slot:append>
                                        <div class="my-4 mx-4">
                                            <div class="">
                                                <v-btn
                                                    @click="procesarPago()"
                                                    block
                                                    color="primary"
                                                >
                                                    Procced To Checkout | $
                                                    {{ totalAmount() }}
                                                </v-btn>
                                            </div>
                                        </div>
                                    </template>
                                </v-navigation-drawer>
                            </div>
                        </v-row>
                    </v-col>
                </v-row>
            </tab-content>
        </form-wizard>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch }     from 'vue-property-decorator';
import orderModule            from '@/store/modules/orderModule';
import contactModule from '@/store/modules/contactModule';
import clientModule from '@/store/modules/clientModule';
import sessionModule from '@/store/modules/sessionModule';
import storageData from '@/store/services/storageService'
import FiltrosProductos from '@/components/FiltrosProductos.vue'
import {serialize, deserialize } from 'jsonapi-fractal'

import cartDrawer from '@/components/cartDrawer.vue'
@Component({
  components: {
    cartDrawer,
    FiltrosProductos
  }
})
export default class Order extends Vue {
    drawer = false
    cartDrawer = false
    cartCount = 0
    current = 1
    paginate = 9
    paginate_total = 0
    isColumnTwelve = false
    isColumnFour = true
    radios = 'radio-1'
    productRating = 3.5
    productList = []
    dataSetting = []
    cartList = []
    brands = []
    rating = []
    selected = false
    isListView = true
    dataSearchCliente : any = [];
    descriptionLimit = 60;
    isLoading = false;
    query = ''
    model = null;
    sectiontitle = ''
    filterProductList : any = []
    listarArticulos : any = [];
    pagination :any = {
        current_page : 0,
        from : 0,
        last_page : 0,
        per_page : 0,
        to : 0,
        total : 0
    }
    direccion_entrega = ''
    id_cliente = ''
    id_condiciones_pagos = ''
    overlay = false;
    datapaginate : any = {
        id_cliente:0,
        page:0
    }
    datafilter : any = {
        id_cliente:0,
        filter:'',
        page:1
    }


    // search
    loading = false
    // items = []
    search = null
    select = null
    querySelect = ''

    created() {
  
    

    }
    async filterCategory(event){
        this.datafilter.id_cliente = this.id_cliente
        this.datafilter.filter     = event
        this.overlay = true
        const res : any = await orderModule.getArticulosVariusFilter(this.datafilter);
        this.pagination.current_page = res.data.meta.page.current_page,
        this.pagination.from = res.data.meta.page.from,
        this.pagination.last_page = res.data.meta.page.last_page,
        this.pagination.per_page = res.data.meta.page.per_page,
        this.pagination.to = res.data.meta.page.to,
        this.pagination.total = res.data.meta.page.total 
        this.listarArticulos = deserialize(res.data)
        this.filterProductList = this.listarArticulos
        this.productList =  this.filterProductList
        this.paginate = Math.ceil(this.pagination.total / this.pagination.per_page)
        this.overlay = false
    }
    async refreshArticulos(event){
        storageData.remove('filterActive');
        this.getArticulosByCliente(this.id_cliente)
    }
    get getCartOrder() {
        return orderModule.getCartList; 
    }
    get settingConfig() : any {
        return sessionModule.getSetting; 
    }
    updateCount(){
        this.cartCount--
    }
    openDrawer(){
        this.cartDrawer = true
    }

    totalAmount() {
        let total = 0
        return (total += this.getCartOrder.reduce(
            (left, cur) => left + cur.precio * cur.qty,
            0
        ))
    }
    addCartx(item) {
        orderModule.addCart(item)
        if (item.qty == 1) this.cartCount++
    }
    setPaginate(i) {
        alert(i)
        if (this.pagination.current_page == 1) {
            return i < this.pagination.per_page
        } else {
            return (
                i >= this.pagination.per_page * (this.pagination.current_page - 1) &&
                i < this.pagination.current_page * this.pagination.per_page
            )
        }
    }
    updateCurrent(i) {

        this.pagination.current_page = i
    }
    async next (page:number) {
        this.datafilter.page = page
        if(storageData.get('filterActive')){
            this.filterCategory(storageData.get('filterActive'))
        }else{
            this.datapaginate.id_cliente = this.id_cliente
            this.datapaginate.page = page
            this.overlay = true
            const res : any = await orderModule.getDataPaginateAticulos(this.datapaginate);
            this.pagination.current_page = res.data.meta.page.current_page,
            this.pagination.from = res.data.meta.page.from,
            this.pagination.last_page = res.data.meta.page.last_page,
            this.pagination.per_page = res.data.meta.page.per_page,
            this.pagination.to = res.data.meta.page.to,
            this.pagination.total = res.data.meta.page.total  
            this.listarArticulos = deserialize(res.data)
            this.filterProductList = this.listarArticulos
            this.productList =  this.filterProductList
            this.paginate = Math.ceil(this.pagination.total / this.pagination.per_page) 
            this.overlay = false 
        }
       
   /*  */
    }
    productRate(rate) {
        this.filterProductList = this.productList.filter(
            (x:any) => x.rating == rate.rates
        )

        if (this.pagination.current_page > 1) this.pagination.current_page = 1
        this.pagination.total = Math.ceil(
            this.filterProductList.length / this.pagination.per_page
        )
    }
    allProductPrice() {
        this.filterProductList = this.productList.filter(
            (x:any) => x.price >= 0
        )
        if (this.pagination.current_page > 1) this.pagination.current_page = 1
        this.pagination.per_page_total = Math.ceil(
            this.filterProductList.length / this.pagination.per_page
        )
    }
    lessThan() {
        this.filterProductList = this.productList.filter(
            (x:any) => x.price < 500
        )
        if (this.pagination.current_page > 1) this.pagination.current_page = 1
        this.pagination.per_page_total = Math.ceil(
            this.filterProductList.length / this.pagination.per_page
        )
    }
    moreThan() {
        this.filterProductList = this.productList.filter(
            (x:any) => x.price >= 500
        )
        if (this.pagination.current_page > 1) this.pagination.current_page = 1
        this.pagination.per_page_total = Math.ceil(
            this.filterProductList.length / this.pagination.per_page
        )
    }
    procesarPago(){
        this.$router.push({ name: "procesarenvio",params: { direccion: this.direccion_entrega,
        id_cliente : this.id_cliente, id_condiciones_pagos : this.id_condiciones_pagos }});
    }
    get items () {
        return this.dataSearchCliente.map(entry => {
          const Description = entry.razonSocial.length > this.descriptionLimit
            ? entry.razonSocial.slice(0, this.descriptionLimit) + '...'
            : entry.razonSocial

          return Object.assign({}, entry, { Description })
        })
    }


    @Watch('search', { immediate: false })
      searchUpdate (val) {
        if (this.isLoading) return
        this.querySelect = val
      }

	async searchClientes(val) {
		this.isLoading = true
		const data = await contactModule.getFiltersCliente(this.querySelect);
		this.dataSearchCliente = data
		this.isLoading = false
	}
    async getClienteAndArticulos(event){
        this.overlay = true
        const dataCliente : any = await clientModule.getClientById(event)
        this.direccion_entrega = dataCliente.direccion_entrega
        this.id_cliente        = dataCliente.id
        this.id_condiciones_pagos = dataCliente.id_condiciones_pagos
        this.overlay = false
        if (dataCliente) {
            this.getArticulosByCliente(event);    
        }
    }
    async getArticulosByCliente (event){
        const res : any = await orderModule.getArticulosByCliente(event);
        this.pagination.current_page = res.data.meta.page.current_page,
        this.pagination.from = res.data.meta.page.from,
        this.pagination.last_page = res.data.meta.page.last_page,
        this.pagination.per_page = res.data.meta.page.per_page,
        this.pagination.to = res.data.meta.page.to,
        this.pagination.total = res.data.meta.page.total 
        this.listarArticulos = deserialize(res.data)
        this.filterProductList = this.listarArticulos
        this.productList =  this.filterProductList
        this.paginate = Math.ceil(this.pagination.total / this.pagination.per_page)
    }
    verDetallesArticulo(id_articulo){
        this.$router.push({ name: "detalleArticulo",params: { id: id_articulo }});
        console.log(id_articulo)
    }
    gridView() {
        this.isListView = false
    }
    listView() {
        this.isListView = true
    }
    mounted(){
        this.dataSetting = this.settingConfig //Configuracion General del cliente Guardada en LocalStorage
    }

}
</script>
<style lang="scss" scoped>
    .panel_white{
        background: white;
        border-radius: 6px;
        box-shadow: 0 0 3px;
    }
    .order{
        background: white;
        padding: 3%;
        border-radius: 8px;
    }
    .object-contain{
        cursor:pointer;
    }
</style>
