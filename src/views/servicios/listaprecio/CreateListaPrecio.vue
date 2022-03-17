<template>
    <div>
		<v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <v-form ref="listaPrecioForm"  lazy-validation class="form_contacto" >	
            <input type="hidden" v-model="listaPrecioForm.id" value="0" >
                <TitleSection :sectiontitle="sectiontitle"/>
                <v-row>
                 	<v-col cols="12" sm="6" md="3">
						<v-text-field label="Código Lista Precio" placeholder="Código Lista Precio" outlined dense :rules="rules" v-model="listaPrecioForm.co_lista_precio">
                        </v-text-field>
					</v-col>
           	        <v-col cols="12" sm="6" md="3">
                        <v-text-field label="Nombre" placeholder="Nombre" outlined dense :rules="rules" v-model="listaPrecioForm.nombre">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-select
                            :items="monedas"
                            item-text="nombre"
                            item-value="id"
                            label="Monedas"
                            placeholder="Monedas"
                            v-model="listaPrecioForm.id_moneda"
                            outlined
                            dense
                            :rules="rules"
                            required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-select
                            :items="inactivo"
                            item-text="text"
                            item-value="value"
                            label="Estatus"
                            placeholder="Estatus"
                            v-model="listaPrecioForm.estatus"
                            outlined
                            dense
                            :rules="rules"
                            required
                        ></v-select>
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
import listaPrecioModule from '@/store/modules/listaPrecioModule';
import { required } from 'vee-validate/dist/rules'
import { ValidationObserver } from 'vee-validate'
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class CreateListaPrecio extends Vue {

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
	listaPrecioForm : any = {};
	inactivo = [
        {value: '0', text: 'Inactivo'},
        {value: '1', text: 'Activo'}
    ];
    snackbar = false
    textmsj = ''
    color = ''
    sectiontitle = 'Crear Lista de Precio'
    monedas = []
	$refs!: {
        listaPrecioForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return serialize(this.listaPrecioForm,'listaprecios',{});
    }

	onSubmit() {
		const valid =  this.$refs.listaPrecioForm.validate();
     
        if (valid) {
            this.update = false
            this.saveListaPrecio();
        }else {
            alert('Campos Incompletos');
        } 
		 
    }

	async saveListaPrecio() {
        console.log(this.FormRequest)
 		this.overlay = true
    	const data = await listaPrecioModule.saveListaPrecio(this.FormRequest)
		this.reset();
        this.textmsj = 'Lista Precio Creada con Éxito.'
        this.snackbar = true
        this.back();
		this.overlay = false 
    };

    async getMonedas(){
        const monedas : any = await  listaPrecioModule.getMonedas();
        this.monedas = monedas;
    }
	reset () {
        this.$refs.listaPrecioForm.reset()
    };
    back() {
        setTimeout(() => {
            this.$router.go(-1);
            this.snackbar = false
        },2000);
    }
    mounted(){
        this.getMonedas()
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
