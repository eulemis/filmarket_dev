<template>
    <v-row>
    	<v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
            class="laoding"
        ></v-progress-circular>
        </v-overlay>
        <v-col cols="12">
            <Filtro :endpoint="endpoint" :headers="headers"  :label="label" :moduleStore="moduleStore" v-on:updateData="handleDataArticulo"/>
        </v-col>
        <v-col cols="12">
            <DataTable :search="search" 
            :headers="headers"  
            :desserts="desserts" 
            :loading="loadTable" 
            @edit="editarArticulo" 
            :moduleStore="moduleStore" 
            v-on:updateData="handleDataArticulo"
            :section="section"
            :endpoint="endpoint"
            />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
import articuloModule            from '@/store/modules/articuloModule';
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class Contacto extends Vue {
	@Prop() item?: Object;
     headers = [
            {text: 'Código', value: 'co_producto'},
            {text: 'Módelo', value: 'modelo'},
            {text: 'Referencia', value: 'referencia'},
            {text: 'Ubicación', value: 'ubicacion'},
            {text: 'Descripción', value: 'descripcion'},
            {text: 'Action', value: 'action'}
            ];
    overlay = false;
    desserts : any = [];
    search   : String = '';
    selected : Object = [];
    loadTable  : boolean = true ;
    label = 'Buscar Articulo'
    moduleStore = articuloModule
    section : string = 'articulo'
    endpoint : string = 'productos' 
    handleDataArticulo(event){
        this.desserts = event;
        this.loadTable = false;
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
