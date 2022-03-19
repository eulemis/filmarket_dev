<template>
    <div>
        <v-col
            v-for="(product, index) in this.productos"
            v-show="setPaginate(index)"
            :key="index"
            cols="12"
            :class="{'col-lg-4 col-md-6 col-sm-6': !isListView, 'col-md-12': isListView}">
            <div class="overflow-hidden panel_white">
                <div
                    class=""
                    :class="{
                        'list-grid': isListView,
                        'list-horizontal': !isListView,
                        'd-xs-block d-md-flex d-xl-flex d-lg-flex flex-row': isListView
                    }"
                >
                    <img
                        class=""
                        :class="{
                            'object-contain h-64 w-full': !isListView,
                            'object-contain   pa-3': isListView
                        }"
                        :src="product.imgUrl"
                        :height="!isListView ? 150 : ''"
                        :width="isListView ? 128 : ''"
                    />

                    <v-card-text
                        :class="{
                            'align-self-center flex-grow-1 d-xs-block d-md-flex d-lg-flex d-xl-flex justify-space-between align-center': isListView
                        }"
                    >
                        <p class="text-18 ma-0 ">
                            <a href="#" class="text--primary">
                                {{ product.title }}
                            </a>
                        </p>
                        <p
                            :class="{
                                'mb-0  mx-sm-0 mx-md-3 mx-lg-3 mx-xl-3': isListView
                            }"
                            class="body-2 text--disabled font-weight-thin"
                        >
                            {{ product.details }}
                        </p>
                        <div
                            :class="{
                                'mb-sm-0  mx-md-4 mx-lg-4 mx-xl-4  py-xs-3 py-3 py-md-0': isListView,
                                'mb-5': !isListView
                            }"
                            class="d-flex flex-wrap align-center justify-space-between "
                        >
                            <div
                                class="font-weight-bold text-18"
                                :class="{
                                    'ml-4': isListView
                                }"
                            >
                                ${{ product.price }}
                            </div>
                        
                            <div
                                class="font-weight-bold text-18"
                                :class="{
                                    'ml-4': isListView
                                }"
                            >
                                ${{ product.price }}
                            </div>
                        </div>

                        <div
                            :class="{
                                'justify-space-between  flex-wrap': !isListView,
                                'justify-end': isListView
                            }"
                            class="d-flex"
                        >
                        <v-btn 
                        v-if="product.qty >= 1"
                        @click="openDrawer()"
                        small 
                        class="mr-1 mb-1 primary lighten-5 primary--text"
                        >View Cart
                        </v-btn>
                        <v-btn 
                        v-else
                        @click="addCartx(product)"
                        small 
                        class="mr-1 mb-1 primary lighten-5 primary--text"
                        >Add Cart
                        </v-btn>
        
                        </div>
                    </v-card-text>
                </div>
            </div>
        </v-col>
        <v-col cols="12">
            <v-pagination
            v-model="current"
            :length="paginate_total"
            @click.prevent="updateCurrent(page_index)">
            circle
            </v-pagination>
        </v-col>
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
export default class CartProduct extends Vue {
	@Prop() filterProductList?: any;
    @Prop() isListView?: Boolean;
    @Prop() current?: Boolean;
    productos = []
    productList = []
    paginate = 3
    paginate_total = 0
    created() {
        this.productList =  this.filterProductList
        this.paginate_total = Math.ceil(
            this.filterProductList.length / this.paginate
        )
    }
    mounted(){
        this.productos = this.filterProductList
    }

    openDrawer(){
        this.$emit('drawer')
    }
    addCartx(product){
        this.$emit('addCArt',product)
    }
    setPaginate(index){
        this.$emit('setPaginate',index)
    }
}

</script>