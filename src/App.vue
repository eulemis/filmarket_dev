<template>
  <v-app>
    <transition name="fade">
      <v-main>
        <router-view/>
      </v-main>
    </transition>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
  

</style>
