<template>
    <div>
         <div>
		<v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <v-form ref="formUserVendedor"  lazy-validation class="form_contacto" >	
            <input type="hidden" v-model="formUserVendedor.id" value="0" >
                <TitleSection :sectiontitle="sectiontitle"/>
                <v-row>
                    <v-container >
                        <v-layout row wrap>
                            <v-col cols="12" sm="6" md="3">
                                <v-text-field label="Nombre Completo" placeholder="Nombre Completo" outlined dense :rules="rules" v-model="formUserVendedor.name">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <v-text-field
                                label="Email"
                                placeholder="Email"
                                outlined
                                dense
                                :rules="emailRules"
                                v-model="formUserVendedor.email"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <v-text-field    :type="show ? 'text' : 'password'"  label="Password" placeholder="Password" outlined dense :rules="rules" v-model="formUserVendedor.password"  @click:append="show = !show">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <v-text-field  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"   :type="show ? 'text' : 'password'"  label="Password Confirmation" placeholder="Password Confirmation" outlined dense :rules="rules" v-model="formUserVendedor.password_confirmation"  @click:append="show = !show">
                                </v-text-field>
                            </v-col>
                        </v-layout>
                    </v-container>
                </v-row>
            <div class="mt-5 d-flex justify-end ">
                <v-btn small color="primary mr-3" @click="reset">Limpiar</v-btn>
                <v-btn small @click="submitSetting" color="success"  >Guardar</v-btn> 
            </div>
        </v-form>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import usersModule from '@/store/modules/usersModule';
import { required } from 'vee-validate/dist/rules'
import { ValidationObserver } from 'vee-validate'
import {serialize, deserialize } from 'jsonapi-fractal'
@Component({
  components: {
 
  }
})
export default class CrearUsuarioVendedor extends Vue {
    formUserVendedor = {
        id:'',
        tipo:'vendedor',
        name:'',
        email:'',
        device_name:'iphone',
        password:'',
        password_confirmation:'',

    }
    sectiontitle = 'Crear Usuario Vendedor'
    show : Boolean =  false;
    overlay = false;
    snackbar = false
    textmsj     = '' 
    get FormRequestUserVendedor(): any {
        return serialize(this.formUserVendedor,'usuario/asignar',{});
    } 

    $refs!: {
        formUserVendedor: InstanceType<typeof ValidationObserver>;
    };
    reset () {
        if (!this.$refs.formUserVendedor.validate()) {
            this.$refs.formUserVendedor.reset()
        }  
    };
    async submitSetting() {
        console.log(this.FormRequestUserVendedor)
         const valid = await this.$refs.formUserVendedor.validate();
        if (valid) {
            this.overlay = true
            const data = await usersModule.saveUsuarioVendedor(this.FormRequestUserVendedor)  
            this.textmsj = 'Usuario Creado con Éxito.'
            this.snackbar = true
            this.overlay = false
    
        } else {
            //return false
        }       
    
    };
    data(){
        return{
            rules: [
                (v:any) => !!v || 'Campo requerido'
            ],
            emailRules: [
                v => !!v || 'E-mail is requerido',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ]      
        }
    };
    mounted(){
        this.formUserVendedor.id = this.$route.params.id
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