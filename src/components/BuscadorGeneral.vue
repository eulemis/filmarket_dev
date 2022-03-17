<template>
    <div>
       	<v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <v-card-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
                <v-col class="mt-8" cols="12" sm="9" md="3">
                    <v-select
                        :items="newHeaders"
                        item-text="text"
                        item-value="value"
                        label="Seleccione filtro"
                        placeholder="Seleccione Filtro"
                        outlined
                        dense
                        @change="filterSearch($event)"
                    ></v-select>
                </v-col>
            <v-text-field
                @keyup.enter="searchData()"
                v-model="data.query"
                :label="label"
                single-line
                hide-details
            ></v-text-field>
            <v-btn
             rounded
            color="primary"
            dark
            @click="searchData()"
            >
            Buscar
            </v-btn>
        </v-card-title>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import globalModule from '@/store/modules/globalModule';

@Component
export default class FiltroGeneral extends Vue {
    @Prop() readonly label!: string
    @Prop() readonly moduleStore!: any
    @Prop() readonly headers!: any
    @Prop() readonly endpoint!: string
 
    overlay : boolean = false
    newHeaders : any = []
    data : any = {
        query:null,
        filter:null,
        endpoint:this.endpoint
    }

    filterSearch(event){
        this.data.filter = event
    }
    
 	async searchData() {
      
	 	this.overlay = true
		const data = await globalModule.getFilterSearch(this.data);
        this.$emit('updateData', data);
		this.overlay = false 
	} 
    eliminarCampoAction(array,elem) {
        return this.headers.filter(e=> e.text!==elem.text && e.value!==elem.value);
        
    }
    mounted(){   
       this.newHeaders = this.eliminarCampoAction(this.headers,{text:'Action',value : 'action'});
    }
}

</script>