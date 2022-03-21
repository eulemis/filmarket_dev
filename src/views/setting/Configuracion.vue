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
            ref="settingForm"
          >
            <v-container >
               <TitleSection :sectiontitle="sectiontitle"/>
            
                <v-layout row wrap >
                    <v-flex xs12 sm6 md3>
                        <v-select
                            :items="option"
                            item-text="text"
                            item-value="value"
                            label="Sesión con tiempo de Expiración"
                            placeholder="Sesión con tiempo de Expiración"
                            v-model="settingForm.reactivar_sesion"
                            outlined
                            dense
                            class="pl-3 pr-3"
                            :rules="rules"
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select
                        :items="items"
                        item-text="nombre"
                        item-value="id"
                        label="Almacen para Ventas"
                        v-model="settingForm.id_almacen"
                        outlined
                        dense
                        class="pl-3 pr-3"
                        :rules="rules"
                        required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select
                            :items="option"
                            item-text="text"
                            item-value="value"
                            placeholder="Mostrar Stock en Catálogo"
                            label="Mostrar Stock en Catálogo"
                            v-model="settingForm.ver_stock_art"
                            outlined
                            dense
                            class="pl-3 pr-3"
                            :rules="rules"
                            required
                            ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select
                            :items="option"
                            item-text="text"
                            item-value="value"
                            label="Mostrar alerta de Stock Negativo"
                            placeholder="Mostrar alerta de Stock Negativo"
                            v-model="settingForm.msj_sinstock"
                            outlined
                            dense
                            class="pl-3 pr-3"
                            :rules="rules"
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select
                            :items="tipodocumento"
                            item-text="text"
                            item-value="value"
                            label="Tipo Documento a usar en Fuerza de Ventas"
                            placeholder="Tipo Documento a usar en Fuerza de Ventas"
                            v-model="settingForm.tipo_documento"
                            outlined
                            dense
                            class="pl-3 pr-3"
                            :rules="rules"
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select
                            :items="option"
                            item-text="text"
                            item-value="value"
                            label="Permitir el uso Stock Negativo"
                            placeholder="Permitir el uso Stock Negativo"
                            v-model="settingForm.usar_stock_neg"
                            outlined
                            dense
                            class="pl-3 pr-3"
                            :rules="rules"
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select
                            :items="option"
                            item-text="text"
                            item-value="value"
                            label="Los Clientes se pueden autoregistrar"
                            placeholder="Los Clientes se pueden autoregistrar"
                            v-model="settingForm.auto_reg_clientes"
                            outlined
                            dense
                            class="pl-3 pr-3"
                            :rules="rules"
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                    
                    <v-text-field label="Logo de la Empresa"
                    @click='$refs.image.click()'
                    v-model='imageName' 
                    prepend-icon="mdi-camera"
                    class="pl-3 pr-3"
                    outlined
                    dense
                    ></v-text-field>
                    <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                    >
                    <img class="img_prev" :src="imageUrl" height="120" v-if="imageUrl"/>
                    </v-flex>
                    <v-divider></v-divider>
                    </v-layout>
            </v-container>
            <v-container>  
                <h4>Filtros a Manejar en el Catálogo</h4>
                <v-layout>    
                    <v-row>
                        <v-flex xs6 >
                            <v-switch
                            label="Categoría"
                            v-model="settingForm.filtro_categoria"
                            color="success"
                            :value="categoria"  
                            hide-details
                            class="pl-3 pr-3"
                            ></v-switch>
                            <v-switch
                            label="Línea"
                            v-model="settingForm.filtro_linea"
                            color="success"
                            :value="linea"    
                            hide-details
                            class="pl-3 pr-3"
                            ></v-switch>
                            <v-switch
                            label="Sub-línea"
                            v-model="settingForm.filtro_sublinea"
                            color="success"
                            :value="sublinea"    
                            hide-details
                            class="pl-3 pr-3"
                            ></v-switch>
                            <v-switch
                            label="Color"
                            v-model="settingForm.filtro_color"
                            color="success"
                            :value="color"
                            hide-details
                            class="pl-3 pr-3"
                            ></v-switch>
                            <v-switch
                            label="Procedencia"
                            v-model="settingForm.filtro_procedencia"
                            color="success"
                             :value="procedencia"
                            hide-details
                            class="pl-3 pr-3"
                            ></v-switch>
                            <v-switch
                            label="Precio"
                            v-model="settingForm.filtro_precio"
                            color="success"
                            hide-details
                            class="pl-3 pr-3"
                            :value="precio"
                           
                            ></v-switch>
                        </v-flex>
                    </v-row>
                </v-layout>
            </v-container>
            <div class="mt-5 d-flex justify-end ">
                <v-btn small color="error mr-3" @click="reset">Cancelar</v-btn>
                <v-btn small @click="submitSetting" color="success"  >Actualizar</v-btn> 
            </div>
        </v-form>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import settingModule from '@/store/modules/settingModule';
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { Setting } from "@/store/interfaces/Setting";
import {serialize, deserialize } from 'jsonapi-fractal'
import storageData from '@/store/services/storageService'

@Component({
  components: {

  }
})
export default class Configuracion extends Vue {
    items = [];
    imagen = null;
    showImage = null;
    imageName = '';
    imageUrl : any = '';
    imageFile = '';
    overlay = false;
    settingForm = {
        id:'1',
        reactivar_sesion : 0,
        id_almacen: 0,
        ver_stock_art: 0,
        msj_sinstock: 0,
        tipo_documento: '',
        usar_stock_neg: 0,
        auto_reg_clientes: 0,
        filtro_categoria: false,
        filtro_linea: false,
        filtro_sublinea: false,
        filtro_color: false,
        filtro_procedencia: false,
        filtro_precio: false,
    }
    logo = ''
    snackbar = false
    textmsj     = ''
    precio      = false
    color       = false
    linea       = false
    sublinea    = false
    categoria   = false
    procedencia = false
    option = [
        {value: '0', text: 'No'},
        {value: '1', text: 'Si'}
    ]; 
    tipodocumento = [
        {value: 'cotizacion', text: 'Cotización'},
        {value: 'pedido', text: 'Pedido'}
    ]; 
    sectiontitle = 'Parámetros Generales'  
    data(){
    return{
            rules: [
            (v:any) => !!v || 'Campo requerido'
        ] 
            
        }
    };

    get FormRequest(): any {
        return serialize(this.settingForm,'configuracionesgenerales',{});
    } 
    onFilePicked (e) {
        const files = e.target.files   
        if(files[0] !== undefined) {
            this.imageName = files[0].name
            if(this.imageName.lastIndexOf('.') <= 0) {
                return
            }
       
            const fr = new FileReader ()
            fr.readAsDataURL(files[0])
            fr.addEventListener('load', () => {
                this.imageUrl = fr.result
                this.imageFile = files[0]
                this.logo = this.imageFile
            }) 
        } else {
            this.imageName = ''
            this.imageFile = ''
            this.imageUrl = ''
        }
    }

    $refs!: {
        settingForm: InstanceType<typeof ValidationObserver>;
    };
    async submitSetting() {
        const valid = await this.$refs.settingForm.validate();
        if (this.logo) {
            if (valid) {
                this.overlay = true
                const dataLogo = await settingModule.saveLogoSetting(this.logo)
                const data = await settingModule.saveSetting(this.FormRequest)
                this.textmsj = 'Configuración Actualizada con Éxito.'
                this.snackbar = true
                this.configuraciones();
                this.overlay = false 
            } else {
                //return false
            }
        } else {
            this.overlay = true
            const data = await settingModule.saveSetting(this.FormRequest)
            this.textmsj = 'Configuración Actualizada con Éxito.'
            this.snackbar = true
            this.configuraciones();
            this.overlay = false 
        }    
    };
    getAlmacenes() {   
        settingModule.getAlmacenAll()
        .then((res:any) =>  {
            if (res) {
                this.items = res;
            }
        }
      )     
    };
    configuraciones() {   
        this.overlay = true
        settingModule.getConfiguraciones()
        .then((res:any) =>  {
            if (res) {
                this.settingForm = res[0];
                storageData.remove('_setting');
                storageData.set('_setting', res[0]);
                //TO-DO = 'Lógica para manipular los v-switch toggle'
                this.settingForm.filtro_precio      = (res[0]['filtro_precio']      == "0") ? false : true
                this.settingForm.filtro_categoria   = (res[0]['filtro_categoria']   == "0") ? false : true
                this.settingForm.filtro_linea       = (res[0]['filtro_linea']       == "0") ? false : true
                this.settingForm.filtro_sublinea    = (res[0]['filtro_sublinea']    == "0") ? false : true
                this.settingForm.filtro_color       = (res[0]['filtro_color']       == "0") ? false : true
                this.settingForm.filtro_procedencia = (res[0]['filtro_procedencia'] == "0") ? false : true
                this.imageUrl = res[0]['logo']
                this.imageName = 'logo.jpg'
                this.snackbar = false
              
            }
        this.overlay = false
      }
      )     
    };
    reset () {
        if (!this.$refs.settingForm.validate()) {
            this.$refs.settingForm.reset()
        }  
    };
    mounted() {
        this.getAlmacenes();
        this.configuraciones();
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