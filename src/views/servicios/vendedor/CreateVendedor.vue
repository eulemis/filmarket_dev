<template>
    <div>
		<v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <v-form ref="vendedorForm"  lazy-validation class="form_contacto" >	
            <input type="hidden" v-model="vendedorForm.id" value="0" >
                <TitleSection :sectiontitle="sectiontitle"/>
                <v-row>
                 	<v-col cols="12" sm="6" md="3">
						<v-text-field label="Código Vendedor" placeholder="Código Vendedor" outlined dense :rules="rules" v-model="vendedorForm.co_vendedor">
                        </v-text-field>
					</v-col>
           	        <v-col cols="12" sm="6" md="3">
                        <v-text-field label="Nombre Completo" placeholder="Nombre Completo" outlined dense :rules="rules" v-model="vendedorForm.nombre_completo">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field label="Cédula" placeholder="Cédula" outlined dense :rules="rules" v-model="vendedorForm.cedula">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field label="Email" placeholder="Email" outlined dense :rules="emailRules" v-model="vendedorForm.email">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field label="Teléfono" placeholder="Teléfono" outlined dense :rules="rules" v-model="vendedorForm.telefono">
                        </v-text-field>
                    </v-col>
              
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field label="Porcentaje por comisión de Venta"  type="number" placeholder="Porcentaje por comisión de Venta" outlined dense :rules="numberRule" v-model="vendedorForm.porcentaje_comision_venta">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field label="Porcentaje por comisión de Cobro"  type="number" placeholder="Porcentaje por comisión de Cobro" outlined dense :rules="numberRule" v-model="vendedorForm.porcentaje_comision_cobro">
                        </v-text-field>
                    </v-col>
                    <!--v-col cols="12" sm="6" md="3">
                        <v-select
                            :items="inactivo"
                            item-text="text"
                            item-value="value"
                            label="Estatus"
                            placeholder="Estatus"
                            v-model="vendedorForm.estatus"
                            outlined
                            dense
                            :rules="rules"
                            required
                        ></v-select>
                    </v-col-->
                    <v-col cols="12" sm="6" md="3">
                    		<v-select
                            :items="listaprecios"
                            item-text="nombre"
                            item-value="id"
                            label="Lista de Precios"
                            placeholder="Lista de Precios"
                            v-model="vendedorForm.id_lista_precios"
                            outlined
                            dense
                            :rules="rules"
                            required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="9" md="9">
                    	 <v-textarea
							label="Dirección"
							placeholder="Dirección"
							outlined
							dense
							:rules="rules"
							v-model="vendedorForm.direccion"
                            rows="3"
						></v-textarea>
                    </v-col>
            </v-row>
            <div class="mt-5 d-flex justify-end ">
                <v-btn small color="primary mr-3" @click="reset">Limpiar</v-btn>
                <v-btn small @click="onSubmit" color="success"  >Guardar</v-btn> 
            </div>
        </v-form>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import vendedorModule from '@/store/modules/vendedorModule';
import { required } from 'vee-validate/dist/rules'
import { ValidationObserver } from 'vee-validate'
import {serialize, deserialize } from 'jsonapi-fractal'
@Component({
  components: {
 
  }
})
export default class EditarVendedor extends Vue {

	descriptionLimit = 60;
	entries = [];
	dataSearchCliente : any = [];
    isLoading = false;
    model = null;
    search = null;
	overlay = false;
	title : string = '';
	subtitle : string = ''
    update : boolean = false;
	vendedorForm : any = {};
	inactivo = [
        {value: '0', text: 'Inactivo'},
        {value: '1', text: 'Activo'}
    ];
    snackbar = false
    textmsj = ''
    color = ''
    sectiontitle = 'Crear Datos Vendedor'
    listaprecios = []
	$refs!: {
        vendedorForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return serialize(this.vendedorForm,'vendedores',{});
    }

	onSubmit() {
		const valid =  this.$refs.vendedorForm.validate();
     
        if (valid) {
            this.update = false
            this.saveVendedor();
        }else {
            alert('Campos Incompletos');
        } 
		 
    }

	async saveVendedor() {
        console.log(this.FormRequest)
 		this.overlay = true
    	const data : any = await vendedorModule.saveVendedor(this.FormRequest)
		this.reset();
        this.textmsj = 'Vendedor Creado con Éxito.'
        this.color = 'success'
        this.snackbar = true
        this.back();
		this.overlay = false 
    };

    async getListaPrecios(){
        const listaprecio : any = await  vendedorModule.getListaPreciosAll();
        this.listaprecios = listaprecio;
    }
	reset () {
        this.$refs.vendedorForm.reset()
    };
    back() {
        setTimeout(() => {
            this.$router.go(-1);
            this.snackbar = false
        },2000);
    }
    mounted(){
        this.getListaPrecios()
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

}
</script>
<style lang="scss">
.form_contacto{
    background: white;
    padding: 5%;
    border-radius: 8px;
}
</style>
