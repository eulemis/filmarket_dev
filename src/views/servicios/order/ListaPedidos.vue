<template>
    <v-row>
    	<v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
            class="laoding"
        ></v-progress-circular>
        </v-overlay>
            <ButtonOpen  @openView="openView" :title="title" />
        <v-col cols="12">
            <Filtro :endpoint="endpoint" :headers="headers"  :label="label" :moduleStore="moduleStore" v-on:updateData="handleDataPedidos"/>
        </v-col>
        <v-col cols="12">
            <DataTable :search="search" 
            :headers="headers"  
            :desserts="desserts" 
            :loading="loadTable" 
            @edit="editarArticulo" 
            :moduleStore="moduleStore" 
            v-on:updateData="handleDataPedidos"
            :section="section"
            :endpoint="endpoint"
            />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
import orderModule            from '@/store/modules/orderModule';
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class ListaPedidos extends Vue {
	@Prop() item?: Object;
     headers = [
            {text: 'Código Pedido', value: 'co_pedido'},
            {text: 'Monto del Pedido', value: 'monto_bruto'},
            {text: 'Dirección de Entrega', value: 'direccion_entrega'},
            {text: 'Action', value: 'action'}
            ];
    overlay = false;
    desserts : any = [];
    search   : String = '';
    selected : Object = [];
    loadTable  : boolean = true ;
    label = 'Buscar Pedido'
    moduleStore = orderModule
    section : string = 'pedidos'
    endpoint : string = 'pedidos' 
    title  : string = 'NEW ORDER'
    handleDataPedidos(event){
        this.desserts = event;
        this.loadTable = false;
    }
    openView(){
        this.$router.push({ name: "order"});
    }

    editarArticulo(id_articulo) {
        this.$router.push({ name: "editararticulo", params: { id: id_articulo } });
    }

}
</script>
<style lang="scss" scoped>
::v-deep .table-one {
    thead.v-data-table-header {
        tr {
            &:hover {
                background-color: #f2f3f8;
            }
            th {
                span {
                    font-size: 16px;
                    color: #304156;
                }
            }
        }
        tr {
            td {
                padding-bottom: 20px;
                padding-top: 20px;
            }
        }
    }
    tbody {
        tr {
            &:hover {
                background-color: #f2f3f8 !important;
            }
        }
    }
}
.loading{
    z-index:210;
}
</style>
