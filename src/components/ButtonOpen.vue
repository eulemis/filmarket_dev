<template>
    <div>
        <div class="col-sm-9 col-md-3 col-12 btn_open">
            <v-btn
                color="primary"
                dark
                class="mb-2 ml-3" 
                @click="openView"                          >
                {{title}}
            </v-btn>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
@Component({
  components: {

  }
})
export default class ButtonOpen extends Vue {
	@Prop() title?: String;
    openView(){
        this.$emit('openView')
    }
}

</script>
