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
            <Filtro  :endpoint="endpoint" :headers="headers"  :label="label" :moduleStore="moduleStore" v-on:updateData="handleDataLista"/>
        </v-col>
        <v-col cols="12">
            <DataTable :search="search" 
            :headers="headers" 
            :desserts="desserts" 
            :loading="loadTable" 
            @customChange="openView"  
            :title="title" 
            @edit="editarLista" 
            @delete="showModalDelete" 
            :moduleStore="moduleStore" 
            v-on:updateData="handleDataLista"
            :section="section"
            :endpoint="endpoint"
            />
        </v-col>
        <ModalDelete @deleteData="deleteLista" :dialogDelete="dialogDelete" @cerrarModal="cerrarModal"/>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
import listaPrecioModule            from '@/store/modules/listaPrecioModule';
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class ListaPrecio extends Vue {
	@Prop() item?: Object;
     headers = [
            {text: 'Nombre', value: 'nombre'},
            {text: 'Código', value: 'co_lista_precio'},
            {text: 'Action', value: 'action'}
            ];
    section : string = 'listaprecio'
    overlay = false;
    desserts : any = [];
    search   : String = '';
    selected : Object = [];
    loadTable  : boolean = true ;
    clientes : any = [];
    dialog : boolean = false;
    dialogDelete : boolean = false;
    title  : string = 'NEW LISTA PRECIO'
    tituloModal : string = ''
    dataEditForm : object = {}
    dataDeleteForm  = {
        id : '',
        deletedAt : ''
    }
    snackbar = false
    textmsj = ''
    timeout = 2000
    label = 'Buscar Lista'
    moduleStore = listaPrecioModule
    page = 1
    endpoint : string = 'listaprecios'

    get FormRequestDelete(): any {
        return serialize(this.dataDeleteForm,'listaprecios',{});
    }
    openView(){
        this.$router.push({ name: "createlistaprecio"});
    }

    showModalDelete(id){
        this.dialogDelete = true;
        this.dataDeleteForm.id = id
        this.dataDeleteForm.deletedAt = this.currentDate()
    }
    cerrarModal(event){
        this.dialogDelete = event;
    }
    async deleteLista(event){
        let dataUpdate : any = []
        this.dialogDelete = event;
        this.overlay = true
        const res : any = await listaPrecioModule.deleteListaPrecio(this.FormRequestDelete);
        dataUpdate = deserialize(res.data)
        this.desserts = dataUpdate;
        this.textmsj = 'Lista Precio Eliminada con Éxito.'
        this.snackbar = true
        this.closeSnackbar()
        this.overlay = false
    }
    closeSnackbar(){
        setTimeout(() => {
            this.snackbar = false
        },2000);
    }
    handleDataLista(event){
        this.desserts = event;
        this.loadTable = false;
    }
    currentDate() {
        var date = new Date();
        return  date.toISOString();
    }

    editarLista(id_lista_precio) {
        this.$router.push({ name: "editarlistaprecio", params: { id: id_lista_precio } });
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
