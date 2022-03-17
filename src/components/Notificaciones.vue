<template>
    <div>
        <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="success"
        bottom
        >{{ textmsj }}
        </v-snackbar>
     
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class EditarCliente extends Vue {
	@Prop() snackbar : boolean = false;
    @Prop() textmsj : string  = '';
    timeout = 2000


}
</script>