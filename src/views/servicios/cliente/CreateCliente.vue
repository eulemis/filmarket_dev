<template>
    <div>
	    <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
   
        <v-form class="formCliente" ref="clientForm"  lazy-validation >	
               <TitleSection :sectiontitle="sectiontitle"/>
            <form-wizard  
            class="test" 
            :start-index="0" 
            :title="title" 
            :subtitle="subtitle" 
            @on-complete="onComplete" 
            color="#009db0" 
            shape="tab" 
            finish-button-text="Guardar" 
            back-button-text="Atras" 
            next-button-text="Siguiente">
                <tab-content title="Datos Fiscales" icon="mdi mdi-bank-check" :before-change="beforeTabSwitch">
					<v-row>
                    	<v-col
						cols="12"
						sm="6"
						md="3"
						>
						<v-text-field
							label="Código"
							placeholder="Código"
							outlined
							dense
							:rules="rules"
							v-model="clientForm.co_cliente"
						></v-text-field>
						</v-col>
                        <v-col
						cols="12"
						sm="6"
						md="3"
						>
						<v-text-field
							label="Rif"
							placeholder="Rif"
							outlined
							dense
							:rules="rules"
							v-model="clientForm.rif"
						></v-text-field>
						</v-col>
                        <v-col
						cols="12"
						sm="6"
						md="6"
						>
						<v-text-field
							label="Nombre completo o Razón social"
							placeholder="Nombre completo o Razón social"
							outlined
							dense
							:rules="rules"
							v-model="clientForm.razon_social"
						></v-text-field>
						</v-col>
                        <v-col
						cols="12"
						sm="6"
						md="6"
						>
						 <v-textarea
							label="Dirección Fiscal"
							placeholder="Dirección Fiscal"
							outlined
							dense
							:rules="rules"
							v-model="clientForm.direccion_fiscal"
                            rows="3"
						></v-textarea>
						</v-col>				
						<v-col
						cols="12"
						sm="6"
						md="6"
						>
						<v-textarea
							label="Direccion Entrega"
							placeholder="Direccion Entrega"
							outlined
							dense
							:rules="rules"
							v-model="clientForm.direccion_entrega"
                            rows="3"
						></v-textarea>
						</v-col>
					    <v-col
						cols="12"
						sm="6"
						md="3"
						>
						<v-text-field
							label="Teléfono"
							placeholder="Teléfono"
							outlined
							dense
							:rules="rules"
							v-model="clientForm.telefono"
						></v-text-field>
						</v-col>
               		    <v-col
						cols="12"
						sm="6"
						md="3"
						>
						<v-text-field
							label="Email"
							placeholder="Email"
							outlined
							dense
							:rules="emailRules"
							v-model="clientForm.email"
						></v-text-field>
						</v-col>
                        <v-col
						cols="12"
						sm="6"
						md="3"
						>
						  <v-select
                            :items="option"
                            item-text="text"
                            item-value="value"
                            label="Agente Retención"
                            placeholder="Agente Retención"
                            v-model="clientForm.agente_retencion"
                            outlined
                            dense
                            :rules="rules"
                            required
                        
                        ></v-select>
						</v-col>
      				</v-row>
				</tab-content>
				<tab-content title="Otros Datos " icon="mdi mdi-badge-account-alert">
					<input type="hidden" v-model="clientForm.id" value="0" >
					<v-row>
                    	<v-col
						cols="12"
						sm="6"
						md="3"
						>
						<v-select
                            :items="tipoclientes"
                            item-text="nombre"
                            item-value="id"
                            label="Tipo Cliente"
                            placeholder="Tipo Cliente"
                            v-model="clientForm.id_tipo_cliente"
                            outlined
                            dense
                            :rules="rules"
                            required
                        ></v-select>
						</v-col>
						<v-col
						cols="12"
						sm="6"
						md="3"
						>
						<v-select
                            :items="vendedor"
                            item-text="nombreCompleto"
                            item-value="id"
                            label="Vendedor"
                            placeholder="Vendedor"
                            v-model="clientForm.id_vendedor"
                            outlined
                            dense
                            :rules="rules"
                            required
                        ></v-select>
						</v-col>
							<v-col
						cols="12"
						sm="6"
						md="3"
						>
						<v-select
                            :items="condicionespago"
                            item-text="nombre"
                            item-value="id"
                            label="Condicion Pago"
                            placeholder="Condicion Pago"
                            v-model="clientForm.id_condiciones_pagos"
                            outlined
                            dense
                            :rules="rules"
                            required
                        ></v-select>
						</v-col>
                                  <v-col
                            cols="12"
                            sm="6"
                            md="3"
                            >
                            <v-select
                            :items="zonas"
                                item-text="nombre"
                                item-value="id"
                                label="Zona"
                                placeholder="Zona"
                                outlined
                                dense
                                :rules="rules"
                                v-model="clientForm.id_zona"
                            ></v-select>
                            </v-col>
      				</v-row>
					  	<v-row>
						<v-col
						cols="12"
						sm="6"
						md="3"
						>
						<v-select
                            :items="segmentos"
                            item-text="nombre"
                            item-value="id"
                            label="Segmento"
                            placeholder="Segmento"
                            v-model="clientForm.id_segmento"
                            outlined
                            dense
                            :rules="rules"
                            required
                        ></v-select>
						</v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="3"
                            >
                            <v-select
                                :items="inactivo"
                                item-text="text"
                                item-value="value"
                                label="Estatus"
                                placeholder="Activo/Inactivo"
                                outlined
                                dense
                                :rules="rules"
                                v-model="activo"
                             
                            ></v-select>
                        </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="3"
                            >
                            <v-text-field
                                label="Porcentaje Descuento"
                                placeholder="Porcentaje Descuento"
                                outlined
                                dense
                                v-model="clientForm.porcentaje_desc_global"
                                type="number"
                                :rules="numberRule"
                            ></v-text-field>
                            </v-col>
      				    </v-row>
				</tab-content>
            </form-wizard> 
        </v-form>
    <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
     <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title >
          Campos Incompletos
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import clientModule from '@/store/modules/clientModule';
import { required } from 'vee-validate/dist/rules'
import { ValidationObserver } from 'vee-validate'
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class EditarCliente extends Vue {
	zonas?: any = [];
	tipoclientes?: any = [];
	vendedor?: any = [];
	segmentos?: any = [];
	condicionespago?: any = [];
	overlay = false;
	title : string = '';
	subtitle : string = ''
	clientForm : any = {inactivo: '1'};
	option = [
        {value: '0', text: 'No'},
        {value: '1', text: 'Si'}
    ];
	inactivo = [
        {value: '0', text: 'Inactivo'},
        {value: '1', text: 'Activo'}
    ];
   
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    sectiontitle = 'Crear Datos del Cliente'
    dialog = false
	$refs!: {
        clientForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return serialize(this.clientForm,'clientes',{});
    }

    get activo() {
        return this.clientForm.inactivo = '1'
    }
     beforeTabSwitch(){

        if (this.clientForm.co_cliente == '') {
           return false
        }else {
            return true
        }
    } 

	onComplete() {
		const valid =  this.$refs.clientForm.validate();

        if (valid) {
            this.saveCliente();
        }else {
            this.dialog = true
        } 
		
    }
 	async saveCliente() {
 		this.overlay = true
    	const data = await clientModule.saveClient(this.FormRequest)
		this.reset();
        this.textmsj = 'Cliente Creado con Éxito.'
        this.color = 'success'
        this.snackbar = true
        this.back();
		this.overlay = false 
    }; 

    async comboboxAll(){
        const zona              = await  clientModule.getZonasAll();
        this.zonas = zona;
        const tipocliente       = await  clientModule.getTipoClienteAll();
        this.tipoclientes = tipocliente;
        const segmento          = await  clientModule.getSegmentosAll();
        this.segmentos = segmento;
        const vendedor          = await  clientModule.getVendedorAll();
        this.vendedor = vendedor;
        const condicionespago   = await  clientModule.getCondicionesPagoAll();
        this.condicionespago = condicionespago
    }

	reset () {
        this.$refs.clientForm.reset()
    };
    back() {
        setTimeout(() => {
            this.$router.go(-1);
            this.snackbar = false
        },2000);
    }

	data(){
    return{
        rules: [
            (v:any) => !!v || 'Campo requerido'
        ],
		emailRules: [
			v => !!v || 'E-mail is requerido',
			v => /.+@.+/.test(v) || 'E-mail must be valid',
		], 
        numberRule: [
            v => !!v || 'campo requerido',
            v => v > 0  || 'El valor debe ser mayor a cero',
            v => v <= 100  || 'El valor debe ser menor a 100'
        ]
            
        }
    };
    mounted(){

        this.comboboxAll();       
       
    }
}
</script>
<style lang="scss" scoped>
    .formCliente{
        background: white;
        padding: 3%;
        border-radius: 8px;
    }
    .vue-form-wizard .wizard-header{
        display: none;
    }
</style>
