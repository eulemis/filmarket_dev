<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://www.filicabh.com.ve/" target="_blank">Filmarket</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://www.filicabh.com.ve/" target="_blank">Soluciones Filicabh</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
