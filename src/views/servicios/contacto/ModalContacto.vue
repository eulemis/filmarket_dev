<template>
    <div>
		<v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <form-wizard :start-index="0" :title="title" :subtitle="subtitle" @on-complete="onComplete" color="#009db0" shape="tab" finish-button-text="Guardar">
          	<v-form ref="contactForm"  lazy-validation >	
				<tab-content title="Datos Generales" icon="ti-home" >
					<input type="hidden" v-model="contactForm.id" value="0" >
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
						hide-selected
						item-text="razonSocial"
						item-value="id"
						label="Cliente"
						placeholder="Start typing to Search"
						dense
						outlined
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
                            placeholder="Estatus"
                            v-model="contactForm.estatus"
                            outlined
                            dense
                            :rules="rules"
                            required
                        ></v-select>
						</v-col>
			
      				</v-row>
				
				</tab-content>
          	</v-form>
        </form-wizard>
		<div style="display:none"><pre>{{ Edit }}</pre></div>  
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import contactModule from '@/store/modules/contactModule';
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { required } from 'vee-validate/dist/rules'
import { ValidationObserver } from 'vee-validate'
import {serialize, deserialize } from 'jsonapi-fractal'
@Component
export default class ModalContacto extends Vue {
	@Prop() clientes?: any;
	@Prop() editData?: Object;
	descriptionLimit = 60;
	entries = [];
	dataSearchCliente : any = [];
    isLoading = false;
    model = null;
    search = null;
	overlay = false;
	title : string = '';
	subtitle : string = ''
	contactForm : any = {
		id: '',
    	co_contacto:  '',
    	nombre_completo:  '',
    	telefono:  '',
    	celular:  '',
    	email:  '',
    	cargo:  '',
    	id_cliente: 0,
    	estatus:  ''
	};
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
	get Edit(): any {
		return this.contactForm = this.editData
		//wrapper.vm.selectItem('foo')
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
		  console.log(val)
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

		this.searchClientes(val);
    }

	async searchClientes(val) {
		this.isLoading = true
		const data = await contactModule.getFiltersCliente(val);
		console.log('en Modal::' + data)
		this.dataSearchCliente = data
		this.isLoading = false
	}
    
	onComplete() {
		const valid =  this.$refs.contactForm.validate();
		let id = this.contactForm['id'] ;
		if (id == undefined) {
			
			if (valid) {
				this.saveContacto();
			} else {
				alert('Campos Incompletos');
			} 
		} else {
			if (valid) {
				this.updateContacto();
			}else {
				alert('Campos Incompletos');
			} 
		}
    }
	async saveContacto() {
		console.log(this.FormRequest)
		this.overlay = true
  /*   	const data = await contactModule.saveContact(this.FormRequest)
		this.reset();
		this.$emit('closeDialog')
		this.$emit('updateData', data); */
		this.overlay = false
    };
	async updateContacto() {
		this.overlay = true
    	const data = await contactModule.updateContact(this.FormRequest)
		this.reset();
		this.$emit('closeDialog')
		this.$emit('updateData', data);
		this.overlay = false
    };
	reset () {
        this.$refs.contactForm.reset()
    };

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
