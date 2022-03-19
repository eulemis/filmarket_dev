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
            @on-complete="confirm" 
            color="#009db0" 
            shape="tab" 
            finish-button-text="Actualizar" 
            back-button-text="Atras" 
            next-button-text="Siguiente">
                <tab-content title="Datos Fiscales" icon="mdi mdi-bank-check">
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
            <v-dialog v-model="update" max-width="350">
            <v-card>
                <v-card-title class="text-h5">
                    Actualizar Registro
                </v-card-title>

                <v-card-text>
                    Estas Seguro de Actualizar el Registro?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="red darken-1"
                        text
                        @click="update = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="onSubmit()"
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
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { required } from 'vee-validate/dist/rules'
import { ValidationObserver } from 'vee-validate'
import {serialize, deserialize } from 'jsonapi-fractal'
import Notificacion from '@/components/Notificaciones.vue';

@Component({
  components: {
    Notificacion
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
	clientForm : any = {};
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    update : boolean = false
    mensaje : boolean = false
    sectiontitle = 'Actualizar Datos del Cliente'
	option = [
        {value: '0', text: 'No'},
        {value: '1', text: 'Si'}
    ];
	inactivo = [
        {value: '0', text: 'Inactivo'},
        {value: '1', text: 'Activo'}
    ];
	$refs!: {
        clientForm: InstanceType<typeof ValidationObserver>;
    };
    change(e){
        alert(e)
    }
	get FormRequest(): any {
        return serialize(this.clientForm,'clientes',{});
    }
    get activo() {
        return this.clientForm.inactivo = '1'
    }

    confirm(): any {
        const valid =  this.$refs.clientForm.validate();
        if (valid) {
		    this.update = true
        } else {
         
            alert('Campos Incompletos')
        }
	}

	onSubmit() {
        this.update = false
		const valid =  this.$refs.clientForm.validate();

        if (valid) {
            this.updateCliente();
        }else {
            alert('Campos Incompletos');
        } 
		
    }

	async updateCliente() {
		this.overlay = true
    	const data = await clientModule.updateClient(this.FormRequest)
		this.reset();
        this.textmsj = 'Cliente Actualizado con Éxito.'
        this.snackbar = true
        this.color = 'success'
        this.back();
		this.overlay = false
    };
    async getClientById(id) {
        this.overlay = true
        const data : any = await clientModule.getClientById(id)  
        this.clientForm = data;
        this.clientForm.id_zona              = data.id_zona.toString();
        this.clientForm.id_segmento          = data.id_segmento.toString();
        this.clientForm.id_vendedor          = data.id_vendedor.toString();
        this.clientForm.id_tipo_cliente      = data.id_tipo_cliente.toString();
        this.clientForm.id_condiciones_pagos = data.id_condiciones_pagos.toString();
        this.overlay = false
    }   
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
        let id = this.$route.params.id
        this.comboboxAll();
        this.getClientById(id);
       
       
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
