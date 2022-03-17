<template>
    <div>
       <div>
           <v-radio-group>
                <v-radio
                    v-if="dataSetting.filtro_categoria != 0"
                    class="ma-0 pa-0"
                    @change="filterCategory($event)"
                    value="categoria"
                    label="Categoría"
                ></v-radio>
               <v-radio
                v-if="dataSetting.filtro_linea != 0"
                    class="ma-0 pa-0"
                    @change="filterCategory($event)"
                    value="linea"
                    label="Línea"
                >
                </v-radio>
                <v-radio
                 v-if="dataSetting.filtro_sublinea != 0"
                class="ma-0 pa-0"
                @change="filterCategory($event)"
                value="sublinea"
                label="Sub Línea"
                >
                </v-radio>
                <v-radio
                v-if="dataSetting.filtro_color != 0"
                class="ma-0 pa-0"
                @change="filterCategory($event)"
                value="color"
                label="Color"
                >
                </v-radio>
                <v-radio
                v-if="dataSetting.filtro_procedencia != 0"
                v-model="selected"
                class="ma-0 pa-0"
                @change="filterCategory($event)"
                value="procedencia"
                label="Procedencia"
                >
                </v-radio>
                <v-radio
                v-if="dataSetting.filtro_precio != 0"
                class="ma-0 pa-0"
                @change="filterCategory($event)"
                value="precio"
                label="Precio"
                >
                </v-radio>
            </v-radio-group>
            <!--v-checkbox
            v-if="dataSetting.filtro_categoria != 0"
                class="ma-0 pa-0"
                @change="filterCategory($event)"
                value="categoria"
                label="Categoría"
            >
            </v-checkbox>
            <v-checkbox
            v-if="dataSetting.filtro_linea != 0"
                class="ma-0 pa-0"
                @change="filterCategory($event)"
                value="linea"
                label="Línea"
            >
            </v-checkbox>
            <v-checkbox
            v-if="dataSetting.filtro_sublinea != 0"
                class="ma-0 pa-0"
                @change="filterCategory($event)"
                value="sublinea"
                label="Sub Línea"
            >
            </v-checkbox>
            <v-checkbox
            v-if="dataSetting.filtro_color != 0"
                class="ma-0 pa-0"
                @change="filterCategory($event)"
                value="color"
                label="Color"
            >
            </v-checkbox>
            <v-checkbox
            v-if="dataSetting.filtro_procedencia != 0"
                v-model="selected"
                class="ma-0 pa-0"
                @change="filterCategory($event)"
                value="procedencia"
                label="Procedencia"
            >
            </v-checkbox>
            <v-checkbox
            v-if="dataSetting.filtro_precio != 0"
                class="ma-0 pa-0"
                @change="filterCategory($event)"
                value="precio"
                label="Precio"
            >
            </v-checkbox-->
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
import sessionModule from '@/store/modules/sessionModule';
import storageData from '@/store/services/storageService'

@Component({
  components: {

  }
})
export default class FiltrosProductos extends Vue {
	@Prop() title?: String;
    dataSetting = []
    selected    = false
    get settingConfig() : any {
        return sessionModule.getSetting; 
    }
    filterCategory(event:string){
        console.log(event)
        this.$emit('getFilterOrder',event)
    }
    mounted(){
        this.dataSetting = this.settingConfig //Configuracion General del cliente Guardada en LocalStorage
    }
}

</script>