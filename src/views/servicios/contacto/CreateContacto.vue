<template>
    <div>
		<v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <v-form ref="contactForm"  lazy-validation class="form_contacto" >	
            <input type="hidden" v-model="contactForm.id" value="0" >
                <TitleSection :sectiontitle="sectiontitle"/>
                <v-row>
                <v-col
                cols="12"
                sm="6"
                md="3"
                >
                <v-text-field
                    label="Nombre Completo"
                    placeholder="Nombre Completo"
                    outlined
                    dense
                    :rules="rules"
                    v-model="contactForm.nombre_completo"
                ></v-text-field>
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
                    v-model="contactForm.telefono"
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="3"
                >
                <v-text-field
                    label="Celular"
                    placeholder="Celular"
                    outlined
                    dense
                    :rules="rules"
                    v-model="contactForm.celular"
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="3"
                >
                <v-text-field
                    label="Cargo"
                    placeholder="Cargo"
                    outlined
                    dense
                    :rules="rules"
                    v-model="contactForm.cargo"
                ></v-text-field>
                </v-col>
            
            </v-row>
            <v-row>
                <v-col
                cols="12"
                sm="6"
                md="3"
                >
                <v-text-field
                    label="Código Contacto"
                    placeholder="Código Contacto"
                    outlined
                    dense
                    :rules="rules"
                    v-model="contactForm.co_contacto"
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
                    v-model="contactForm.email"
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                md="3"
                >
                <v-autocomplete
                v-model="contactForm.id_cliente"
                :items="items"
                :loading="isLoading"
                item-text="razonSocial"
                item-value="id"
                label="Cliente"
                placeholder="Buscar Cliente"
                dense
                outlined
                append-icon="mdi-account-search"
                @click:append="searchClientes()"
                @keyup.enter="searchClientes()"
                :search-input.sync="search"
                hide-no-data
                hide-selected
                ></v-autocomplete>
                
                <v-expand-transition>
                    <v-list
                        v-if="model"
                        style="display:none"
                    >
                        <v-list-item
                        v-for="(field, i) in dataSearchCliente"
                        :key="i"
                        >
                        </v-list-item>
                    </v-list>
                </v-expand-transition>
                </v-col>
                <!--v-col
                cols="12"
                sm="6"
                md="3"
                >
                <v-select
                    :items="inactivo"
                    item-text="text"
                    item-value="value"
                    label="Estatus"
                    placeholder="Estatus"
                    v-model="contactForm.estatus"
                    outlined
                    dense
                    :rules="rules"
                    required
                ></v-select>
                </v-col-->
            </v-row>
            <div class="mt-5 d-flex justify-end ">
                <v-btn small color="error mr-3" @click="reset">Cancelar</v-btn>
                <v-btn small @click="onSubmit" color="success"  >Guardar</v-btn> 
            </div>
        </v-form>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import contactModule from '@/store/modules/contactModule';
import { required } from 'vee-validate/dist/rules'
import { ValidationObserver } from 'vee-validate'
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class EditarContacto extends Vue {

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
	contactForm : any = {};
	inactivo = [
        {value: '0', text: 'Inactivo'},
        {value: '1', text: 'Activo'}
    ];
    snackbar = false
    textmsj = ''
    color = ''
    querySelect = ''
    sectiontitle = 'Crear Datos de Contacto'
	$refs!: {
        contactForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return serialize(this.contactForm,'contactos',{});
    }

    get items () {
        return this.dataSearchCliente.map(entry => {
          const Description = entry.razonSocial.length > this.descriptionLimit
            ? entry.razonSocial.slice(0, this.descriptionLimit) + '...'
            : entry.razonSocial

          return Object.assign({}, entry, { Description })
        })
    }

    @Watch('search', { immediate: false })
      searchUpdate (val) {
        if (this.isLoading) return
        this.querySelect = val
      }

	async searchClientes(val) {
		this.isLoading = true
		const data = await contactModule.getFiltersCliente(this.querySelect);
		this.dataSearchCliente = data
		this.isLoading = false
	}

	onSubmit() {
		const valid =  this.$refs.contactForm.validate();
     
        if (valid) {
            this.update = false
            this.saveContact();
        }else {
            alert('Campos Incompletos');
        } 
		 
    }

	async saveContact() {
		this.overlay = true
    	const data = await contactModule.saveContact(this.FormRequest)
		this.reset();
        this.textmsj = 'Contacto Creado con Éxito.'
        this.snackbar = true
        this.back();
		this.overlay = false
    };
	reset () {
        this.$refs.contactForm.reset()
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
