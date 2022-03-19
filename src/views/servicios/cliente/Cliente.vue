<template>
    <v-row>
    	<v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <ButtonOpen  @openView="openView" :title="title"/>
        <v-col cols="12" >
            <Filtro  :endpoint="endpoint" :headers="headers"  :label="label" :moduleStore="moduleStore" v-on:updateData="handleDataCliente"/>
        </v-col>
        <v-col cols="12">
            <DataTable :headers="headers" 
            :desserts="desserts" 
            :loading="loadTable" 
            @createUser="openViewCrearUser"  
            :title="title" 
            @edit="editarCliente" 
            @delete="showModalDeleteClient" 
            :moduleStore="moduleStore" 
            v-on:updateData="handleDataCliente"
            :section="section"
            :endpoint="endpoint"
            />
            <!--Pagination :pagination="pagination" /-->
        </v-col>
        <ModalDelete @deleteData="deleteClient" :dialogDelete="dialogDelete" @cerrarModal="cerrarModal"/>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import clientModule from '@/store/modules/clientModule';
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class Cliente extends Vue {
    headers = [
            {text: 'Razon Social', value: 'razon_social'},
            {text: 'Rif', value: 'rif'},
            {text: 'Email', value: 'email'},
            {text: 'Telefono', value: 'telefono'},
            {text: 'Action', value: 'action'}
            ];
    section : string = 'cliente'
    overlay = false;
    desserts  = [];
    search   : String = '';
    selected : Object = [];
    loadTable  : boolean = true ;
    zonas : any = [];
    tipoclientes : any = [];
    segmentos : any = [];
    vendedor : any = [];
    condicionespago : any = [];
    dialog : boolean = false;
    dialogDelete : boolean = false;
    title  : string = 'NEW CLIENT'
    tituloModal : string = ''
    dataEditForm : object = {}
    client_id : number = 0
    dataDeleteForm  = {
        id : '',
        deletedAt : ''
    }
    snackbar = false
    textmsj = ''
    timeout = 2000
    label = 'Buscar Clientes'
    moduleStore = clientModule
    itemsPerPage = 0
    endpoint : string = 'clientes' 
   

    get FormRequestDelete(): any {
        return serialize(this.dataDeleteForm,'clientes',{});
    }
    openView(){
        this.$router.push({ name: "createcliente"});
    }
    editarCliente(id_cliente) {
        this.$router.push({ name: "editarcliente", params: { id: id_cliente } });
    }
    showModalDeleteClient(id){
        this.dialogDelete = true;
        this.dataDeleteForm.id = id
        this.dataDeleteForm.deletedAt = this.currentDate()
    }
    cerrarModal(event){
        this.dialogDelete = event;
    }
    openViewCrearUser(id_cliente){
        this.$router.push({ name: "crearusuariocliente", params: { id: id_cliente } });
    }
    async deleteClient(event){
        let dataUpdate : any = []
        this.dialogDelete = event;
        this.overlay = true
        const res : any = await clientModule.deleteCliente(this.FormRequestDelete);
        dataUpdate = deserialize(res.data)
        this.textmsj = 'Cliente Eliminado con Éxito.'
        this.snackbar = true
        this.desserts = dataUpdate;
        this.closeSnackbar();
        this.overlay = false
    }
    closeSnackbar(){
        setTimeout(() => {
            this.snackbar = false
        },2000);
    }
    handleDataCliente(event){
        this.desserts = event;
        this.loadTable = false;
    }
    currentDate() {
        var date = new Date();
        return  date.toISOString();
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
</style>
