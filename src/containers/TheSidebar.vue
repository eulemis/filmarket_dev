<template>
  <CSidebar 
    fixed 
    :show="show"
  
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img src="img/logos_filmarket/filmarket_blanco.png" width="180" alt="">
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 110 134" 
      />
    </CSidebarBrand>
       <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import theMenu from './TheMenu.vue';


export default {
  name: 'TheSidebar',
  nav,
  
  components:{
    theMenu,
  },
  computed: {
    show () {console.log('Thesidebar::  ' + this.$store.state.sidebar)
     return (this.$store.state.sidebar) ? 'hide' : 'show';
     // return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  },

}
</script>
<style lang="scss">
  .c-sidebar-nav{
    margin-left: -23px;
  }
</style>
