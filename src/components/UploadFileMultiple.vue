<template>
    <div>
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <div class="image-view">
            <div class="addbox">
                <input type="file" @change="getImgBase()"  id="uploadfiles" name="uploadfiles[]" ref="uploadfiles" multiple="multiple" >
                <div class="addbtn"><i class='fa fa-cloud-upload'></i></div>
            </div>
       
                <Draggable  
                    v-if="dataUpload.length > 0"  
                    class="w-full max-w-md" 
                    ghost-class="moving-card" 
                    :animation="200" 
                    :move="checkMove"
                    @start="start"
                    @end="end"
                    :list="dataUpload"
                >
                    <div class="item" v-for="(item, index) in dataUpload" :key="index">
                        <span class="cancel-btn" @click="delImg(index)"><i class="fa fa-trash"></i></span>
                        <span v-if="index == 0 " :class="{ check_btn : index == 0 }">PORTADA</span>
                        <img @click="selectImage(index)" :src="urlImg(item)">
                    </div>
                </Draggable>
           
        </div>
        <div class="mb-5">
            <v-btn small @click="deleteAll()" color="primary mr-3" >Limpiar</v-btn>
            <v-btn small @click="uploadFile()" color="success"  >Actualizar</v-btn> 
        </div>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>

    </div>
</template>
<script>
    import articuloModule  from '@/store/modules/articuloModule';
    import storageData from '@/store/services/storageService'
    import Draggable from 'vuedraggable'
    export default {
        name: 'imageView',
        props:['id'],
        components:{
            Draggable
        },
        data (){
            return {
                image:'',
                dataUpload:[],
                dataSubmit:{
                formdata : {},
                    id   : 0
                },
                overlay : false,
                snackbar : false,
                textmsj : '',
                color : '',
                showImage: false,
                isActive:'',               
            }
        },
        methods: { 
            urlImg: function(img){
                return URL.createObjectURL(img);
            },
            start: function (evt) {
                //console.log("start", evt)
            },
            end: function (evt) {
            
            },
            checkMove: function(e) {

            },

            getImgBase(){  
                 const _this = this
                var event = event || window.event;
                var files = event.target.files;
               
                for (let i = 0; i < files.length; i++) {
                    const reader = new FileReader()
                    _this.dataUpload.push(files[i]);
                }
               
            },
            
            selectImage(index){
                this.isActive = index 
            },
            delImg(index){
                this.dataUpload.splice(index,1);
            },
            deleteAll(){
                this.dataUpload = [];
            },
            async uploadFile(){ 
                this.overlay = true
                const _this = this 
                let formData = new FormData();
                var files = this.dataUpload;
                var totalfiles = this.dataUpload.length; 
            
                for (var i = 0; i < totalfiles; i++) { 
                    formData.append("fotos[]", files[i]);
                }
       
                this.dataSubmit.formdata = formData
                this.dataSubmit.id       = this.id
                const data = await articuloModule.updateArticulo(this.dataSubmit);
                this.textmsj = 'Imagenes Subidas con Éxito.'
                this.color = 'success'
                this.snackbar = true
                this.dataUpload = [];
                this.back()
                this.overlay = false  
            },
            back() {
                setTimeout(() => {
                    this.$router.go(-1);
                    this.snackbar = false
                },2000);
            }
        }
    }
</script>
<style scoped>
    *{margin:0 auto;padding:0;font-family:"Microsoft Yahei";}
    .clearboth::after{
        content:"";
        display:block;
        clear:both;
    }
    .image-view{
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;
        width: 1;
        margin: 50px auto;
        background-color: #f6f6f6;
        padding: 18px;
        border:  3px dashed #ccc;
        
    }
    .image-view .addbox{
        float:left;
        position:relative;
        height:100px;
        width:100px;
        margin-bottom:20px;
        text-align:center;
    }
    .image-view .addbox input{
        position:absolute;
        left:0;
        height:100px;
        width:100px;
        opacity:0; 
    }
    .image-view .addbox .addbtn{
        float:left;
        height:100px;
        width:100px;
        line-height:100px;
        color:black;
        font-size:40px;
        background:#fff;
        border-radius:10px;
        margin-top:10px;
    }
    .image-view .item {
        position:relative;
        float:left;
        height:100px;
    /*     width:100px; */
        margin:10px 10px 0 0;
    }
    .image-view .item .cancel-btn{
        position: absolute;
        right: -4px;
        top: -2px;
        display: block;
        width: 20px;
        height: 20px;
        color: #fff;
        line-height: 20px;
        text-align: center;
        background: red;
        border-radius: 10px;
        cursor: pointer;
    }
    .image-view .item .check_btn{
        position: absolute;
        bottom: 0;
        left: 0px;
        display: block;
        width: 100%;
        height: 25px;
        color: green;
        font-weight: 600;
        line-height: 20px;
        text-align: center;
        background: rgb(178 228 202);
        border-radius: 0px 0px 5px 5px;
        cursor: pointer;
       
    }
     .p_texto{
         position: absolute;
        bottom: 0;
        left: 0px;
        display: block;
        width: 100%;
        height: 25px;
        color: #fff;
        line-height: 20px;
        text-align: center;
        background: rgb(136, 207, 184);
        border-radius: 0px 0px 5px 5px;
        cursor: pointer;
    }
    .image-view .item img{
        width:100%;
        height:100%;
        border-radius:5px;
        cursor:pointer;
    }
    .image-view .view{
        clear:both;
    }
    .mb-5{
        float: right;
    }
    @media screen and (max-width: 640px) {
        .image-view .view{
            display: grid;
        }
    }
    .moving-card {
        @apply opacity-50 bg-gray-100 border border-blue-500;
    }
   
</style>