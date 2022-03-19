<template>
    <div>
    	<v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <v-data-table
            v-model="selected"
            :search="search"
            :headers="headers"
            :items="desserts"
            item-key="id"
            hide-select
            class="elevation-1 table-one"
            multi-sort
            :loading="loading"
            loading-text="Cargando Data... Por Favor Espere"
            @pagination="activarPaginate"
            :itemsPerPage="pagination.per_page"
            :server-items-length="pagination.total"  
            :footer-props="{
                'items-per-page-options': [10, 15, 20, 30, 40, 50, -1],
                'items-per-page-text':'Filtro por Página'
                
            }" 
            :single-expand="singleExpand"
            :expanded.sync="expanded"
        
            >
            <!--template  v-slot:expanded-item="{ headers, item }">
            <td  v-if="section == 'contacto'" :colspan="headers.length">
                Dirección Fiscal :  {{ (item.clientes.direccion_fiscal == null) ? 'N/T' : item.clientes.direccion_fiscal  }}
            </td>
            </template-->
       
                    <template v-slot:[`item.name`]="{ item }">
                        <div class="d-flex align-center">
                            <v-avatar class="mr-2" size="26" dark>
                                <img :src="item.img" alt="" />
                            </v-avatar>
                            <p class="ma-0 font-weight-medium">
                                {{ item.name }}
                            </p>
                        </div>
                    </template>
                    <template v-slot:[`item.action`]="{item}">
                        <div class="d-flex">
                            <v-tooltip top>
                                 <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="success"
                                        dark
                                        @click="Edit(item.id)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-pencil-box-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Edit</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                    v-if="section != 'articulo'"
                                        color="error"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                        @click="Delete(item.id)"   
                                    >
                                        <v-icon>mdi-trash-can-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Delete</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                    v-if="section == 'vendedor' || section == 'cliente'"
                                        color="primary"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                        @click="createUser(item.id)">
                                        <v-icon dark>mdi-account</v-icon>
                                    </v-btn>
                                </template>
                                <span>Crear Usuario</span>
                            </v-tooltip>
                        </div>
                    </template>
                    <template v-slot:[`item.badge`]="{item}">
                        <template v-if="item.badge === 'Active'">
                            <v-chip
                                class=""
                                color="success"
                                label
                                small
                                text-color="white"
                            >
                                <v-icon small left>mdi-check</v-icon>
                                {{ item.badge }}
                            </v-chip>
                        </template>
                        <template v-else>
                            <v-chip
                                class=""
                                color="danger"
                                label
                                small
                                text-color="white"
                            >
                                <v-icon small left>mdi-close</v-icon>
                                {{ item.badge }}
                            </v-chip>
                        </template>
                    </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {serialize, deserialize } from 'jsonapi-fractal'
import globalModule from '@/store/modules/globalModule';


@Component
export default class MainDataTable extends Vue {
    @Prop() readonly headers!: string
    @Prop() readonly desserts!: any
    @Prop() readonly itemsPerPage!: any
    @Prop() readonly search!: string
    @Prop() readonly loading!: boolean
    @Prop() readonly title!: string
    @Prop() readonly moduleStore!: any
    @Prop() readonly section!: string
    @Prop() readonly endpoint!: string
    selected: Object = []
    page : any = {}
    overlay : boolean = false
    data :any = {
        page:null,
        endpoint:this.endpoint,
        itemsPerPage:null,
        token: ''
    }
    pagination :any = {
        current_page : 0,
        from : 0,
        last_page : 0,
        per_page : 0,
        to : 0,
        total : 0
    }
    expanded = []
    singleExpand : boolean = false
    Edit(item){
        this.$emit('edit',item)
    }
    Delete(id){
        this.$emit('delete',id)
    }
    activarPaginate(page){
        console.log(page)
        if (page.itemsPerPage == -1) {
            this.data.page = page.page
            this.data.itemsPerPage = page.itemsLength
        } else {
            console.log( this.data.page)
            this.data.page = page.page
            this.data.itemsPerPage = page.itemsPerPage
        } 
  
        this.dataPaginate(this.data)  
    }
    createUser(id:number){
        this.$emit('createUser',id) 
    }

    async dataPaginate(page){         
        this.overlay = true
        let paginateData : any = [];
        const res : any = await globalModule.dataPaginate(this.data)
        this.pagination.current_page = res.data.meta.page.current_page,
        this.pagination.from = res.data.meta.page.from,
        this.pagination.last_page = res.data.meta.page.last_page,
        this.pagination.per_page = res.data.meta.page.per_page,
        this.pagination.to = res.data.meta.page.to,
        this.pagination.total = res.data.meta.page.total
        if (this.pagination.per_page == this.pagination.total) {
            this.pagination.per_page = -1
        }
        paginateData = deserialize(res.data)
        this.$emit('updateData', paginateData); 
        this.overlay = false
    }
    mounted(){
        this.data.token  = localStorage.getItem('_token')
        console.log(this.data.token )
    }
}
</script>
<style lang="scss" scoped>
::v-deep .table-one {
    thead.v-data-table-header {
        tr {
            &:hover {
                background-color: #f2f3f8;
            }
            th {
                span {
                    font-size: 16px;
                    color: #304156;
                }
            }
        }
        tr {
            td {
                padding-bottom: 20px;
                padding-top: 20px;
            }
        }
    }
    tbody {
        tr {
            &:hover {
                background-color: #f2f3f8 !important;
            }
        }
    }
}
</style>