<template >
      <div>
         <CSidebarNav> 
            <div v-for=" menu in userMenu" :key="menu.id">
                <div v-if="!menu.children" >
                  <CSidebarNavItem   :icon="menu.icon" :name="menu.name"  :to= 'menu.route' />
                </div>
              
                <div v-else >
                    <CSidebarNavDropdown :icon="menu.icon" :name="menu.name"   :route= "menu.route ">
                      <div v-for=" submenu in userSubMenu " :key="submenu.id"  >
                      <CSidebarNavItem  v-if="submenu.menu_id == menu.id" :name="submenu.name" :to="submenu.to"/> 
                      </div>
                  </CSidebarNavDropdown>
                </div>
            </div>
        
        </CSidebarNav>


 

        
      </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import sessionModule from '@/store/modules/sessionModule'

@Component
export default class TheMenu extends Vue {
    
    created(){
      //sessionModule.loadUser()
    }
    
    get userSubMenu() {
        
        return sessionModule.userSubMenu;
      }

    get userMenu() {
        return sessionModule.userMenu;
      }



 


}


</script>