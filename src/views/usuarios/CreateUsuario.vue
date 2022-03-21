<template>
    <v-app>
        <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <v-form class="form-container" 
            lazy-validation 
            ref="usersForm"
          >
            <TitleSection :sectiontitle="sectiontitle"/>
            <v-container >
                <v-layout row wrap >
                     <v-col cols="12" sm="6" md="3">
                        <v-text-field label="Nombre Completo" placeholder="Nombre Completo" outlined dense :rules="rules" v-model="usersForm.name">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field
                        label="Email"
                        placeholder="Email"
                        outlined
                        dense
                        :rules="emailRules"
                        v-model="usersForm.email"
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field    :type="show ? 'text' : 'password'"  label="Password" placeholder="Password" outlined dense :rules="rules" v-model="usersForm.password"  @click:append="show = !show">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"   :type="show ? 'text' : 'password'" @keyup="validarPassword()" label="Password Confirmation" placeholder="Password Confirmation" outlined dense :rules="rules" v-model="usersForm.password_confirmation"  @click:append="show = !show">
                        </v-text-field>
                    </v-col>
                </v-layout>
            </v-container>
            <div class="mt-5 d-flex justify-end ">
                <v-btn small color="primary mr-3" @click="reset">Limpiar</v-btn>
                <v-btn small @click="submitSetting" color="success"  >Guardar</v-btn> 
            </div>
        </v-form>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import usersModule from '@/store/modules/usersModule';
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { Usuarios } from "@/store/interfaces/Usuarios";
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class Users extends Vue {

    overlay = false;
    show : Boolean =  false;
    usersForm = {
        name:'',
        email:'',
        device_name:'iphone',
        password:'',
        password_confirmation:'',
        is_admin:1
    }
    snackbar = false
    textmsj     = '' 
    sectiontitle = 'Crear Usuario'
  
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
    validarPassword(){
        console.log(this.usersForm.password_confirmation)
    }

    get FormRequestAdmin(): any {
        return serialize(this.usersForm,'crearadmin',{});
    } 

    $refs!: {
        usersForm: InstanceType<typeof ValidationObserver>;
    };
    async submitSetting() {
        console.log(this.FormRequestAdmin)
        const valid = await this.$refs.usersForm.validate();
        if (valid) {
            this.overlay = true
            const data = await usersModule.saveUsuarioAdmin(this.FormRequestAdmin)  
            this.textmsj = 'Usuario Creado con Éxito.'
            this.snackbar = true
            this.overlay = false
    
        } else {
            //return false
        }      
   
    };
    reset () {
        if (!this.$refs.usersForm.validate()) {
            this.$refs.usersForm.reset()
        }  
    };
    mounted() {
    }
}

</script>
<style lang="scss" scoped>
    .form-container{
        background-color: white;
        padding: 4%;
        border-radius: 5px;
    }
    .img_prev{
        float: right;
        margin-top: -20px;
        margin-right: 12px;
        border-radius: 5px;
        width:250px;
    } 
</style>
