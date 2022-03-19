<template>
  <div>
  <CAlert  v-if="$store.state.error  && $store.state.errors.code !=401 "  color="danger" closeButton>
    <ul>
      <li 
        v-for="(e,index) in $store.state.errors.error" :key="index">
         <span 
          v-for="message in e" 
          :key="message">{{message}}</span>
      </li>
    </ul>
    </CAlert>
  </div>
</template>

<script>

export default {
  name: 'responseError',
 
}
</script>
