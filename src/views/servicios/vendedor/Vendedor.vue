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
            <Filtro  :endpoint="endpoint" :headers="headers"  :label="label" :moduleStore="moduleStore" v-on:updateData="handleDataVendedor"/>
        </v-col>
        <v-col cols="12">
            <DataTable :search="search" 
            :headers="headers" 
            :desserts="desserts" 
            :loading="loadTable" 
            @createUser="openViewCrearUser" 
            :title="title" 
            @edit="editarVendedor" 
            @delete="showModalDelete" 
            :moduleStore="moduleStore" 
            v-on:updateData="handleDataVendedor"
            :section="section"
            :endpoint="endpoint"
            />
        </v-col>
        <ModalDelete @deleteData="deleteVendedor" :dialogDelete="dialogDelete" @cerrarModal="cerrarModal"/>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
import vendedorModule            from '@/store/modules/vendedorModule';
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class Vendedor extends Vue {
	@Prop() item?: Object;
     headers = [
            {text: 'Nombre Completo', value: 'nombre_completo'},
            {text: 'Cédula', value: 'cedula'},
            {text: 'Email', value: 'email'},
            {text: 'Telefono', value: 'telefono'},
            {text: 'Action', value: 'action'}
            ];
    section : string = 'vendedor'
    overlay = false;
    desserts : any = [];
    search   : String = '';
    selected : Object = [];
    loadTable  : boolean = true ;
    clientes : any = [];
    dialog : boolean = false;
    dialogDelete : boolean = false;
    title  : string = 'NEW VENDEDOR'
    tituloModal : string = ''
    dataEditForm : object = {}
    dataDeleteForm  = {
        id : '',
        deletedAt : ''
    }
    snackbar = false
    textmsj = ''
    timeout = 2000
    label = 'Buscar Vendedor'
    moduleStore = vendedorModule
    page = 1
    endpoint : string = 'vendedores'
    get FormRequestDelete(): any {
        return serialize(this.dataDeleteForm,'vendedores',{});
    }
    openView(){
        this.$router.push({ name: "createvendedor"});
    }
    editData(item){
        this.dataEditForm = item
        this.tituloModal = 'Actualizar Vendedor'
        this.dialog = true
    }
    showModalDelete(id){
        this.dialogDelete = true;
        this.dataDeleteForm.id = id
        this.dataDeleteForm.deletedAt = this.currentDate()
    }
    cerrarModal(event){
        this.dialogDelete = event;
    }
    openViewCrearUser(id_vendedor){
        this.$router.push({ name: "crearusuariovendedor", params: { id: id_vendedor } });
    }
    async deleteVendedor(event){
        let dataUpdate : any = []
        this.dialogDelete = event;
        this.overlay = true
        const res : any = await vendedorModule.deleteVendedor(this.FormRequestDelete);
        dataUpdate = deserialize(res.data)
        this.desserts = dataUpdate;
        this.textmsj = 'Vendedor Eliminado con Éxito.'
        this.snackbar = true
        this.closeSnackbar();
        this.overlay = false
    }
    closeSnackbar(){
        setTimeout(() => {
            this.snackbar = false
        },2000);
    }
    handleDataVendedor(event){
        this.desserts = event;
        this.loadTable = false;
    }
    currentDate() {
        var date = new Date();
        return  date.toISOString();
    }

    editarVendedor(id_vendedor) {
        this.$router.push({ name: "editarvendedor", params: { id: id_vendedor } });
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
