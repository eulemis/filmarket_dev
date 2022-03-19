<template>
    <div class="page-wrap">
        <div class="session-form-hold">
  	    <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
            <v-card-text class="text-center content">
                <v-avatar size="60" class="mb-4">
                    <img src="@/assets/images/avatars/logo.svg" alt="" />
                </v-avatar>

                <h6 class="text--disabled font-weight-medium mb-10">
                    Sign in to your account
                </h6>
                <v-form ref="loginForm">
                    <v-text-field
                        label="email"
                        v-model="loginForm.email"
                        :rules="emailRules"
                        required
                    />

                    <v-text-field
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        name="input-10-2"
                        label="password"
                        :counter="100"
                        :rules="nameRules"
                        v-model="loginForm.password"
                        @click:append="show = !show"
                    ></v-text-field>
                    <v-checkbox
                        v-model="checkbox1"
                        label="Remember this computer"
                    ></v-checkbox>
                    <v-btn
                        class="mb-4"
                        @click="login"
                        block
                        color="primary"
                        dark
                    >
                        <v-icon left>mdi-login</v-icon>
                        Iniciar Sesión</v-btn
                    >
            
                    <div class="d-flex justify-around flex-wrap">
                        <v-btn text small color="primary" class="mb-2"
                            >Forgot Password</v-btn
                        >
                        <v-btn
                            text
                            small
                            color="primary"
                            to="/app/sessions/sign-up-2"
                            >Create New Account</v-btn
                        >
                    </div>
                </v-form>  
                <v-alert type="error" v-model="alert" dismissible>
                {{ text }}
                </v-alert> 
            </v-card-text>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import sessionModule from '@/store/modules/sessionModule';
import { UserSubmit} from '@/store/interfaces/Auth';
import { required } from 'vee-validate/dist/rules'
import { ValidationObserver } from 'vee-validate'
import {serialize, deserialize } from 'jsonapi-fractal'


@Component
export default class Login extends Vue {
    overlay = false;
    email = '';
    password = '';
    loginError = '';
    text = 'Email o Password Incorrecto'
    alert = false
    loginForm : any = {
        device_name: 'iphone',
        code: 0,
        message: '',
    }
    data(){
        return{
        show:false,
        checkbox1: true,
        checkbox2: false,
        
        emailRules: [
            (v:any) => !!v || 'E-mail is required',
            (v:any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        nameRules: [
            (v:any) => !!v || 'Password is required',
            (v:any) =>
                (v && v.length <= 100) ||
                'Name must be less than 100 characters'
        ]
        }
    };
    get LoginRequest(): any {
        return serialize(this.loginForm,'login',{});
    }

    $refs!: {
        loginForm: InstanceType<typeof ValidationObserver>;
    };
 

    async login() {
        this.overlay = true
        const valid : any =  this.$refs.loginForm.validate();
        if (valid) { 
            const data : any = await sessionModule.login(this.LoginRequest)
            if (data.code == 200) {
                this.$router.push({ name: 'Dashboard' });
                this.overlay = false
            } else {
                this.alert = true
                this.loginError =data.message
            }
        } 
    }
}
</script>
<style lang="scss" scoped>
.page-wrap {
    background-color: #242939 !important;
    display: flex;
    align-items: center;
    padding: 40px 1rem;
    height: 100%;
    min-height: 100vh;
}
.session-form-hold {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
}
.content{
      background-color: white;
      border-radius: 10px;
}
</style>
