<template>
    <v-row>
    	<v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
            class="laoding"
        ></v-progress-circular>
        </v-overlay>
        <ButtonOpen  @openView="openView" :title="title"/>
        <v-col cols="12">
            <Filtro  :endpoint="endpoint" :headers="headers" :label="label" :moduleStore="moduleStore" v-on:updateData="handleDataContacto"/>
        </v-col>
        <v-col cols="12">
            <DataTable :search="search" 
            :headers="headers" 
            :desserts="desserts" 
            :loading="loadTable" 
            :title="title" 
            @edit="editarContacto" 
            @delete="showModalDelete" 
            :moduleStore="moduleStore" 
            v-on:updateData="handleDataContacto"
            :section="section"
            :endpoint="endpoint"
            />
        </v-col>
        <ModalDelete @deleteData="deleteContact" :dialogDelete="dialogDelete" @cerrarModal="cerrarModal"/>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
import contactModule            from '@/store/modules/contactModule';
import clientModule         from '@/store/modules/clientModule';
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class Contacto extends Vue {
	@Prop() item?: Object;
  
    headers = [
            {text: 'Nombre Completo', value: 'nombre_completo'},
            {text: 'Cliente', value: 'clientes.razon_social'},
            {text: 'Cargo', value: 'cargo'},
            {text: 'Email', value: 'email'},
            {text: 'Telefono', value: 'telefono'},
            {text: 'Celular', value: 'celular'},
            {text: 'Action', value: 'action'}
            ];
    section : string = 'contacto'
    overlay = false;
    desserts : any = [];
    search   : String = '';
    selected : Object = [];
    loadTable  : boolean = true ;
    clientes : any = [];
    dialog : boolean = false;
    dialogDelete : boolean = false;
    title  : string = 'NEW CONTACT'
    dataDeleteForm  = {
        id : '',
        deletedAt : ''
    }
    snackbar = false
    textmsj = ''
    timeout = 2000
    label = 'Buscar Contacto'
    moduleStore = contactModule
    page = 1
    endpoint : string = 'contactos'

    get FormRequestDelete(): any {
        return serialize(this.dataDeleteForm,'contactos',{});
    }
    openView(){
        this.$router.push({ name: "createcontacto"});
    }

    showModalDelete(id){
        this.dialogDelete = true;
        this.dataDeleteForm.id = id
        this.dataDeleteForm.deletedAt = this.currentDate()
    }
    cerrarModal(event){
        this.dialogDelete = event;
    }
 
    async deleteContact(event){   
        let dataUpdate : any = []
        this.dialogDelete = event;
        this.overlay = true
        const res : any = await contactModule.deleteContacto(this.FormRequestDelete);
        dataUpdate = deserialize(res.data)
        this.desserts = dataUpdate;
        this.textmsj = 'Contacto Eliminado con Éxito.'
        this.snackbar = true
        this.closeSnackbar();
        this.overlay = false
    }
    closeSnackbar(){
        setTimeout(() => {
            this.snackbar = false
        },2000);
    }
    handleDataContacto(event){
        this.desserts = event;
        this.loadTable = false;
    }
 
    currentDate() {
        var date = new Date();
        return  date.toISOString();
    }

    editarContacto(id_contacto) {
        this.$router.push({ name: "editarcontacto", params: { id: id_contacto } });
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
