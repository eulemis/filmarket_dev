<template>
    <div>
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
     <TitleSection :sectiontitle="sectiontitle"/>
       <input type="hidden" v-model="id" value="0" >
 <!--    <div class="row">
        <div class="col-md-6">
            <div class="input-group">
                <div class="custom-file mb-3"> 
                <input type="file" class="custom-file-input" id="uploadfiles" ref="uploadfiles" multiple required />
                <label class="custom-file-label" for="uploadfiles">Elija varias archivos para cargar</label>
                </div>
            </div>
        </div>
        <div class="col-md-2 prueba">
            <button type="button" @click="uploadFile()" name="upload" class="btn btn-warning">Cargar Archivos</button>
        </div>
    </div>
    Mostrando los archivos cargados 
    <div>
        <ul >
            <li  v-for="(filename, index) in this.$refs.uploadfiles" :key="index"> {{ filename }} </li>
        </ul>
    </div> 
  -->
       <!-- SOME FORM ELEMENTS HERE -->
    <UploadFileMultiple :id="id"/>
  
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
            url: 'https://api.filicabh.com/api/v1/productofotos/'+this.$route.params.id+'/upload',
            thumbnailWidth: 250,
            maxFilesize: 5, // MB
            maxFiles: 5,
            addRemoveLinks: true,
            dictDefaultMessage: "<i class='fa fa-cloud-upload fa-2x'> </i> Cargar Imagenes del Artículo",
            autoProcessQueue:false,
            headers: { 'Content-Type': 'multipart/form-data',"Authorization": "Bearer " + localStorage.getItem('_token') }
        },
            destroyDropzone :  true,
            id:this.$route.params.id,
            sectiontitle : 'Cargar Fotos al Artículo',
            filenames: [],
            overlay : false,
            snackbar : false,
            textmsj : '',
            color : '',
            uploadedFiles : [],
        }
    },
    
    methods: {
        saveForm () {
            if (this.$refs.myVueDropzone.getQueuedFiles().length) {
                console.log(this.$refs.myVueDropzone.getQueuedFiles())
               // this.$refs.myVueDropzone.headers = { "Authorization": "Bearer " + localStorage.getItem('_token') };
                this.$refs.myVueDropzone.processQueue()
            } else {
                alert('Debe Agregar Imagenes')
            }
        },

        errorUploading (file, message, xhr) {
            console.log(file, message, xhr)
        },
        fileUploaded (file, response) {
            
            this.filenames.push(file);

        },
        async  sendingEvent (file, xhr, formData) {
       
            this.uploadedFiles.push(file);
            console.log(file)
            formData.append('fotos[]',this.uploadedFiles)
    		this.overlay = true
           // const dataUpload = await articuloModule.updateArticulo(this.$refs.myVueDropzone.getQueuedFiles());
            this.textmsj = 'Imagenes Subidas con Éxito.'
            this.color = 'success'
            this.snackbar = true
            this.back()
            this.overlay = false
            //const dataArticuloById = await articuloModule.getArticuloWithFotoById(this.$route.params.id);
        },
 
        async uploadFile(){
            
            let formData = new FormData();
            var files = this.$refs.uploadfiles.files;
            var totalfiles = this.$refs.uploadfiles.files.length;

            for (var index = 0; index < totalfiles; index++) {
                formData.append("fotos[]", files[index]);
            } 
         
           // formData.append("id", this.id);
            const data = await articuloModule.updateArticulo(formData);
        },
        removeAllFiles() {
            this.$refs.myVueDropzone.removeAllFiles();
        },
        back() {
        setTimeout(() => {
           // this.$router.go(-1);
            this.snackbar = false
        },2000);
    }
 

    }    
}
//https://www.youtube.com/watch?v=oL83LdJ_Yvs Link para el video tutorial ac erca de cargar imagenes
//https://programmerclick.com/article/4536355486/
</script>

<style lang="scss" scoped>
  @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

</style>
