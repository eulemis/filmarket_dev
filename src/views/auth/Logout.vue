<template>
      <div>
        <CDropdownItem @click="logout" > 
        <CIcon name="cil-lock-locked"   />Cerrar Sesión
        </CDropdownItem  > 
      </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import sessionModule from '@/store/modules/sessionModule'


@Component
export default class Logout extends Vue {

  logout() {
    
    sessionModule
      .logout()
      .then((res:any) =>  {
      this.$router.push({ name: 'Login' });
      }
      )
       
  }
  
}

</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>
