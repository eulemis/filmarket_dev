<template>
  <div>
    <CDataTable
      :items="itemsLista"
      :fields="fields"
      size="sm"
      striped
      :columnFilter="{ external: true, lazy: true } "
      :column-filter-value.sync="filtros"
      v-on:pagination-change="totalItemsPorPagina"
      :itemsPerPageSelect="itemsPerPageSelect"
      :sorter="{ external: true, resetable: false }"
      :sorter-value.sync="ordenItems"
    >
      <template #show_details="{item}">
        <CButton class="mt-1 mr-1 ml-1 mb-1 btn btn-info btn-sm" @click="modificar(item)">
          <CIcon name="cil-trash" />
        </CButton>

        <CButton
          class="mt-1 mr-1 ml-1 mb-1 btn btn-danger btn-sm"
          @click="eliminarModal= !eliminarModal"
        >
          <CIcon name="cil-trash" />
        </CButton>

        <CModal :show.sync="eliminarModal" :no-close-on-backdrop="false" size="lg" color="danger">
          <span>
            ¿Esta seguro que desea eliminar el SubMenu?
            <br />
            {{item.id}} - {{item.name}}
          </span>
          <responseError />
          <template #header>
            <h6 class="modal-title">Eliminar Datos</h6>
            <CButtonClose @click="eliminar = false" class="text-white" />
          </template>
          <template #footer>
            <CButton @click="eliminarModal = false" color="secondary">Cancelar</CButton>
            <CButton @click="eliminar(item)" color="danger">Aceptar</CButton>
          </template>
        </CModal>
      </template>
    </CDataTable>
    <CPagination
      :pages="pagination.total_pages"
      align="start"
      :activePage.sync="pagination.current_page"
      @click.native="listar"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from "vue-property-decorator";
import submenuModule from "@/store/modules/submenuModule";
import { SubMenu } from "@/store/interfaces/SubMenu";
import { Menu } from "@/store/interfaces/Menu";
import { Pagination } from "../../store/interfaces/Pagination";
@Component({})
export default class List extends Vue {
  @Prop() modifyitem?: SubMenu;
  @Prop() activarForm?: boolean;
  @Prop() activarBuscador?: boolean;

  eliminarModal: boolean = false;
  filtros: Object = {};
  columnOrden: string = "";
  tipoOrden: string = "";
  ordenItems: Object = {};
  page: number = 1;
  parametros: any = [];
  itemsLista: any = [];
  fields: Array<any> = [
    { key: "id", _style: "width:5%" },
    { key: "name", _style: "width:20%" },
    { key: "title", _style: "width:10%" },
    { key: "order", _style: "width:10%" },
    { key: "icon", _style: "width:10%" },
    { key: "to", _style: "width:10%;" },
    { key: "namemenu", _style: "width:5%;" },
    {
      key: "show_details",
      label: "Acciones",
      _style: "width:5%",
      sorter: false,
      filter: false
    }
  ];
  

  itemsPerPageSelect: Object = {
    label: "Registros",
    values: [10, 20, 50],
    external: true
  };

  @Watch("ordenItems", { immediate: true, deep: true })
  ordenItemsChange(newVal: any, oldVal: any) {
    if ("column" in newVal) {
      
      this.columnOrden = newVal.column;
      this.tipoOrden = newVal.asc ? "sort_by" : "sort_by_desc";
      this.listar();
    }
  }

  @Watch("activarBuscador", { immediate: true, deep: true })
  filtrosChange(newVal: any, oldVal: any) {
    if (newVal) {
      this.listar();
      this.$emit("update:activarBuscador", false);
    }
  }

  get submenus() {
    return submenuModule.submenus;
  }

  get pagination() {
    return submenuModule.pagination;
  }

  async created() {
    
    this.listar();
    this.listDatatable();
    console.log(this.itemsLista);
  }

  async listar() {
    const tipoOrden: string = this.tipoOrden;

    this.parametros = Object.assign(
      { page: this.pagination.current_page },
      { per_page: this.pagination.per_page },
      { [tipoOrden]: this.columnOrden },
      this.filtros
    );
    submenuModule.getAll(this.parametros);
  }

  totalItemsPorPagina(itemsporpagina: number) {
    this.pagination.current_page = 1;
    this.pagination.per_page = itemsporpagina;
    this.listar();
  }

  async eliminar(item: SubMenu): Promise<void> {
    const result = await submenuModule.eliminarMenu(item as SubMenu);
    if (!this.$store.state.error) {
      this.eliminarModal = false;
    }
  }
  modificar(item: SubMenu) {
    this.$emit("update:modifyitem", item);
    this.$emit("update:activarForm", true);
  }

  listDatatable(){
    const submenu = this.submenus;
    this.itemsLista = Object.keys(submenu).map(function(Index){
      let submenuany = submenu[Index] ;
      const name = submenuany.menu.data.name;
      return  {...submenuany as SubMenu,namemenu:name};
    });




  }

 

}
</script>
<style lang="scss">
</style>
