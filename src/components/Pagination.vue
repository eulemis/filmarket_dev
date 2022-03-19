<template>
  <div class="text-center">
    <v-pagination
      v-model="pagination['current_page']"
      :length="4"
      @input="next"
    ></v-pagination>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
@Component
export default class FiltroGeneral extends Vue {
    @Prop() readonly pagination!: number

    next (page) {
        alert(page)
    }

    mounted(){
        console.log(this.pagination)
    }
}
</script>
