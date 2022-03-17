<template>
    <div>
        <v-dialog v-model="dialogDelete" max-width="350">
            <v-card>
                <v-card-title class="text-h5">
                    Eliminar Registro
                </v-card-title>

                <v-card-text>
                    Estas seguro de eliminar el Registro?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="red darken-1"
                        text
                        @click="cerrarModal()"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="deleteContact()"
                    >
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
@Component({
  components: {

  }
})
export default class ButtonOpen extends Vue {
    @Prop() dialogDelete?: Boolean;
    deleteContact(){
        this.$emit('deleteData',false)
    }
    cerrarModal(){
        this.$emit('cerrarModal',false)
    }
}

</script>