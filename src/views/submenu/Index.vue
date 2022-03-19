<template>
  <CCard size="sm">
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid" />Menú
      </slot>
    </CCardHeader>
    <CCardBody>
      <div v-if="activarForm">
        <CButton class="mr-2 mb-2" color="warning" variant="outline" @click="activarForm = false">
          <CIcon name="cil-file" />&nbsp;Listar
        </CButton>
        <Form :activar.sync="activarForm" :newdata="newdata" :data="menu" />
      </div>
      <div v-else>
        <CButton class="mr-2 mb-2" color="info" variant="outline" @click="mostarForm(true)">
          <CIcon name="cil-file" />&nbsp;Nuevo
        </CButton>
        <CButton
          class="mb-2"
          color="dark"
          variant="outline"
          v-on:click="activarBuscador = !activarBuscador"
        >
          <CIcon name="cil-magnifying-glass" />&nbsp;Buscar
        </CButton>
        <List
          :modifyitem.sync="item"
          :activarForm.sync="activarForm"
          :activarBuscador.sync="activarBuscador"
        />
      </div>
    </CCardBody>
  </CCard>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from "vue-property-decorator";
import Form from "./Form.vue";
import List from "./List.vue";
import { Menu } from "@/store/interfaces/Menu";
import { SubMenu } from "@/store/interfaces/SubMenu";
@Component({
  components: {
    Form,
    List
  }
})
export default class Index extends Vue {
  activarForm: boolean = false;
  activarBuscador: boolean = false;
  newdata: boolean = true;
  menu?: Menu;
  submenu?: SubMenu;
  item?: Object = {};

  @Watch("item", { immediate: true, deep: true })
  modifyItemChange(newVal: any, oldVal: any) {
    if ("id" in newVal) {
      this.menu = newVal;
      this.mostarForm(false);
    }
  }

  mostarForm(newData: boolean) {
    if (newData) {
      this.menu = {
        id: 0,
        name: "",
        title: "",
        order: "",
        icon: "",
        route: "",
        children: false
      };
    }
    console.log("mostrar");
    this.activarForm = true;
  }
}
</script>
<style lang="scss">
</style>
