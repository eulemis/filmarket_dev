<template>
    <div>
     <TitleSection :sectiontitle="sectiontitle"/>
    <div>
        <v-col cols="12" sm="6" md="3">
            <v-text-field
                label="id"
                placeholder="id"
                outlined
                dense
                v-model="id">
            </v-text-field>
        </v-col>
    </div>

        <vue-dropzone ref="myVueDropzone" id="dropzone" 
        :options="dropzoneOptions" 
        :duplicateCheck="true"
        @vdropzone-complete="afterUploadComplete"
        :destroyDropzone="destroyDropzone"
        @vdropzone-sending-multiple="sendMessage"
        >
        </vue-dropzone>  
        <div class="mt-5 d-flex justify-end ">
            <v-btn  @click="shootProcess()" color="success">Guardar</v-btn>   
        </div>  
    </div>
</template>
<script>
import articuloModule            from '@/store/modules/articuloModule';
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
    components:{
        vueDropzone
    },
    data(){
        return{
            dropzoneOptions :  {
            url: 'https://api.filicabh.com/api/v1/productofotos',
            thumbnailWidth: 250,
            maxFilesize: 0.5,
            headers: { "My-Awesome-Header": "header value" },
            addRemoveLinks: true,
            dictDefaultMessage: "<i class='fa fa-cloud-upload fa-2x'> </i> Subir Imagenes del Artículo",
            autoProcessQueue:false
        },
            destroyDropzone :  true,
            id:0,
            sectiontitle : 'Cargar Fotos al Artículo'
        }
    },
    
    methods: {
        afterUploadComplete: async function (response) {            
            if (response.status === 'success'){
                const data = response;
                console.log('uploaded', data);
        
            }
            else
                console.log('error uploaded', response);
        },
        shootProcess: async function () {
            //this.$refs.myVueDropzone1.headers = { "Authorization": "Bearer " + this.$store.getters.getToken };
            this.$refs.myVueDropzone.processQueue();
        },
        sendMessage:  async  function(files, xhr, formData){
          //alert('aqui')
           //formData.append("id",this.id)
           const data = await articuloModule.prueba(files);
        },

    }    
}
//https://www.youtube.com/watch?v=oL83LdJ_Yvs Link para el video tutorial ac erca de cargar imagenes
</script>

<style lang="scss" scoped>
  @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>
