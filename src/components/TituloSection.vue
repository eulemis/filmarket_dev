<template>
    <div>
        <div class="title"> 
            <v-col cols="12" sm="6" md="3">
                <h4>{{ sectiontitle }}</h4><br>
            </v-col>
            <v-btn class="btn_atras mx-2" fab dark small outlined color="indigo mr-3" @click="back()">
                <v-icon color="white" lef>mdi-arrow-left</v-icon>
            </v-btn>
        </div>
    </div>
</template>
<script>

export default {
    props:['sectiontitle'],
    data(){
        return{

        }
    },
    
    methods: {
        back(){
            this.$router.go(-1);
        }
    }    
}
</script>
<style lang="scss" scoped>

.title{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
}
.btn_atras{
    background-color: #3c4b64;
    border: #3c4b64
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    .btn_atras{
        margin-left: 13px;
        margin-top: -24px !important;
        margin-bottom: 10px;
        
    }
    .title{
            padding-right: 58px !important;
    }
}
</style>