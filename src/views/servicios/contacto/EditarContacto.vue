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
                :search-input.sync="search"
                hide-no-data
                show-selected
                item-text="razonSocial"
                item-value="id"
                label="Cliente"
                placeholder="Buscar Cliente"
                dense
                outlined
                :value="clienteEdit"
              
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
            </v-row>
            <div class="mt-5 d-flex justify-end ">
                <v-btn small color="error mr-3" @click="back()">Atras</v-btn>
                <v-btn small color="primary mr-3" @click="reset">Limpiar</v-btn>
                <v-btn small @click="confirm" color="success"  >actualizar</v-btn> 
            </div>
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
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
        </v-form>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import contactModule from '@/store/modules/contactModule';
import clientModule from '@/store/modules/clientModule';
import { required } from 'vee-validate/dist/rules'
import { ValidationObserver } from 'vee-validate'
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class EditarContacto extends Vue {
	@Prop() clientes?: any;
	@Prop() editData?: Object;
    clienteEdit = ''
	descriptionLimit = 60;
	entries = [];
	dataSearchCliente : any = [];
    isLoading = false;
    model = null;
    search = null;
	overlay = false;
	subtitle : string = ''
    update : boolean = false;
	contactForm : any = {};
    snackbar = false
    textmsj = ''
    color = ''
    sectiontitle = 'Actualizar Datos de Contacto'
	inactivo = [
        {value: '0', text: 'Inactivo'},
        {value: '1', text: 'Activo'}
    ];
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
            this.searchClientes(val);
        }

	async searchClientes(val) {
		this.isLoading = true
		const data = await contactModule.getFiltersCliente(val);
        console.log(data)
		this.dataSearchCliente = data
		this.isLoading = false
	}

    confirm(): any {
		this.update = true
	} 
    
	onSubmit() {
		const valid : any =  this.$refs.contactForm.validate();
     
        if (valid) {
            this.update = false
            this.updateContacto();
        }else {
            alert('Campos Incompletos');
        } 
		 
    }

	async updateContacto() {
		this.overlay = true
    	const data = await contactModule.updateContact(this.FormRequest)
		this.reset();
        this.textmsj = 'Contacto Actualizado con Éxito.'
        this.color = 'success'
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
    async getContactById(id) {
        this.overlay = true
        const data : any = await contactModule.getContactById(id)
        if(data){
            const dataCliente : any = await clientModule.getClientById(data.id_cliente)
            this.search = dataCliente.razon_social
        }
        this.contactForm = data;
        this.overlay = false
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
    mounted(){
        let id = this.$route.params.id
        this.getContactById(id);
       /*  this.dataSearchCliente  = [{ id: '0', razonSocial: 'Inactivo',selected:'selected'}] */
       
    }
}
</script>
<style lang="scss">
.form_contacto{
    background: white;
    padding: 5%;
    border-radius: 8px;
}
</style>
