<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="img/avatars/6.jpg"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem @click="updatePassword()">
      <CIcon name="cil-shield-alt" /> Cambiar Contraseña
    </CDropdownItem>
    
      
        
    <Logout/>
      
    

    
  </CDropdown>
</template>



<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import Logout from '@/views/auth/Logout.vue';

@Component({
  components: {
    Logout
  },

})

export default class TheHeaderDropdownAccnt extends Vue {
updatePassword(){
  this.$router.push({ name: "updatepassword" });
}

}

</script>


