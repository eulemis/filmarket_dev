<template>
  <div>
    <CRow class="d-flex content-center" >
      <CCol sm="6">
        <CCard class="text-left">
          <ValidationObserver ref="repertoireForm">
            <CForm id="#formMenu" >
              <CCardBody>
                <CRow form class="form-group"  >
                  <CCol sm="12">
                    <CInput id="id" v-model="data.id" type="hidden" />
                  </CCol>
                  <CCol sm="12">
                    <ValidationProvider name="Nombre" rules="required" v-slot="{errors}">
                      <CInput
                        id="name"
                        label="Nombre"
                        placeholder="Nombre del Menu"
                        v-model="data.name"
                        :invalid-feedback="errors[0]"
                        :is-valid="!errors[0] ? null : false"
                      />
                    </ValidationProvider>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="12">
                    <ValidationProvider name="Titulo" rules="required" v-slot="{errors}">
                      <CInput
                        id="title"
                        label="Titulo"
                        v-model="data.title"
                        :invalid-feedback="errors[0]"
                        :is-valid="!errors[0] ? null : false"
                      />
                    </ValidationProvider>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="6">
                    <ValidationProvider name="Icono" rules="required" v-slot="{errors}">
                      <CInput
                        id="icon"
                        label="Nombre del Icono- CoreUI"
                        v-model="data.icon"
                        :invalid-feedback="errors[0]"
                        :is-valid="!errors[0] ? null : false "
                      />
                    </ValidationProvider>
                  </CCol>
                  <CCol sm="6">
                    <ValidationProvider name="Ruta" rules="required" v-slot="{errors}">
                      <CInput
                        id="route"
                        label="Ruta"
                        placeholder="/Ruta"
                        v-model="data.route"
                        :invalid-feedback="errors[0]"
                        :is-valid="!errors[0] ? null : false"
                      />
                    </ValidationProvider>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="6">
                    <ValidationProvider name="Orden" rules="required|numeric" v-slot="{errors}">
                      <CInput
                        id="order"
                        label="Posición"
                        placeholder="123"
                        v-model="data.order"
                        :invalid-feedback="errors[0]"
                        :is-valid="!errors[0] ? null : false"
                      />
                    </ValidationProvider>
                  </CCol>
                  <CCol sm="6">
                    <CInputCheckbox
                      class="mr-4 mt-4 pt-3"
                      :checked.sync="data.children"
                      label="No Maneja Sub-Menu"
                      :custom="true"
                    />
                  </CCol>
                </CRow>
              </CCardBody>
            </CForm>
          </ValidationObserver>
          <responseError />
          <div class="ml-4 mb-4">
            <CButton @click="$emit('update:activar', false)" class="btn btn-secondary mr-1">Cancelar</CButton>
            <CButton @click="saveMenu" color="btn btn-info" type="submit">Guardar</CButton>
          </div>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Menu } from "@/store/interfaces/Menu";
import menuModule from "@/store/modules/menuModule";
import { ValidationObserver } from "vee-validate";

@Component({})
export default class Form extends Vue {
  @Prop() data?: Menu;
  @Prop() newdata?: boolean;
  @Prop() activar?: boolean;

  $refs!: {
    repertoireForm: InstanceType<typeof ValidationObserver>;
  };

  async saveMenu(e: Event): Promise<void> {
    const valid = await this.$refs.repertoireForm.validate();
    if (valid) {
      const menuData = this.data as Menu;
      if (menuData.id === 0) {
        const result = await menuModule.createMenu(menuData);
      } else {
        const result = await menuModule.actualizarMenu(menuData);
      }
      if (!this.$store.state.error) {
        this.$emit("update:activar", false);
        await this.$refs.repertoireForm.reset();
      }
    }
  }
}
</script>
<style lang="scss" >
</style>