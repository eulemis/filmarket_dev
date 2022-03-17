import Vue from 'vue'
import Router from 'vue-router'
import { http } from '@/utils/http'; 
// Containers
const TheContainer          = () => import('@/containers/TheContainer.vue')

// Views
const Dashboard             = () => import('@/views/dashboard/Dashboard.vue')
const Configuracion         = () => import('@/views/setting/Configuracion.vue')

//Servicios
const Cliente               = () => import('@/views/servicios/cliente/Cliente.vue')
const EditarCliente         = () => import('@/views/servicios/cliente/EditarCliente.vue')
const CreateCliente         = () => import('@/views/servicios/cliente/CreateCliente.vue')
const CrearUsuarioCliente   = () => import('@/views/servicios/cliente/CrearUsuarioCliente.vue')
const Contacto              = () => import('@/views/servicios/contacto/Contacto.vue')
const EditarContacto        = () => import('@/views/servicios/contacto/EditarContacto.vue')
const CreateContacto        = () => import('@/views/servicios/contacto/CreateContacto.vue')
const Vendedor              = () => import('@/views/servicios/vendedor/Vendedor.vue')
const EditarVendedor        = () => import('@/views/servicios/vendedor/EditarVendedor.vue')
const CreateVendedor        = () => import('@/views/servicios/vendedor/CreateVendedor.vue')
const CrearUsuarioVendedor  = () => import('@/views/servicios/vendedor/CrearUsuarioVendedor.vue')
const ListaPrecio           = () => import('@/views/servicios/listaprecio/ListaPrecio.vue')
const EditarListaPrecio     = () => import('@/views/servicios/listaprecio/EditarListaPrecio.vue')
const CreateListaPrecio     = () => import('@/views/servicios/listaprecio/CreateListaPrecio.vue')
const Order                 = () => import('@/views/servicios/order/Order.vue')
const ProcesarEnvio         = () => import('@/views/servicios/order/ProcesarEnvio.vue')
const Pedidos               = () => import('@/views/servicios/Pedidos.vue')
const Articulo              = () => import('@/views/servicios/articulos/Articulo.vue')
const EditarArticulo        = () => import('@/views/servicios/articulos/EditarArticulo.vue')

// Users
const Usuario               = () => import('@/views/usuarios/Usuario.vue')
const Login                 = () => import('@/views/auth/Login.vue')
const Logout                = () => import('@/views/auth/Logout.vue')
const UpdatePassword        = () => import('@/views/auth/UpdatePassword.vue')
const MenuIndex             = () => import('@/views/menu/Index.vue')
const SubmenuIndex          = () => import('@/views/submenu/Index.vue')


//const ListUsers = () => import('@/views/users/List.vue')

// Errors
const Page404 = () => import('@/views/errors/Page404.vue')
const Page500 = () => import('@/views/errors/Page500.vue')

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
     
    
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { Auth: true, title: 'Dashboard' },
        },
        {
          path: 'submenu',
          name: 'Submenu',
          component: SubmenuIndex,
          meta: { Auth: true, title: 'Submenu' },
         
        },
        {
          path: 'parametros',
          name: 'Parámetros Generales',
          component: Configuracion,
          meta: { Auth: true, title: 'Setting' },
     
        },
         {
          path: 'usuarios',
          name: 'usuarios',
          component: Usuario,
          meta: { Auth: true, title: 'Usuario' },
     
        },
        {
          path: 'cliente',
          name: 'Cliente',
          component: Cliente,
          meta: { Auth: true, title: 'Cliente' },
     
        },
        {
          path: 'editarcliente/:id',
          name: 'editarcliente',
          component: EditarCliente,
          meta: { Auth: true, title: 'EditarCliente' },
     
        },
        {
          path: 'createcliente',
          name: 'createcliente',
          component: CreateCliente,
          meta: { Auth: true, title: 'CreateCliente' },
     
        },
        {
          path: 'crearusuariocliente/:id',
          name: 'crearusuariocliente',
          props: true,
          component: CrearUsuarioCliente,
          meta: { Auth: true, title: 'CrearUsuarioCliente' },
     
        }, 
        {
          path: 'contacto',
          name: 'Contacto',
          component: Contacto,
          meta: { Auth: true, title: 'Contacto' },
     
        },
        {
          path: 'editarcontacto/:id',
          name: 'editarcontacto',
          component: EditarContacto,
          meta: { Auth: true, title: 'EditarContacto' },
     
        },
        {
          path: 'createcontacto',
          name: 'createcontacto',
          component: CreateContacto,
          meta: { Auth: true, title: 'CreateContacto' },
     
        },
        {
          path: 'vendedor',
          name: 'Vendedor',
          component: Vendedor,
          meta: { Auth: true, title: 'Vendedor' },
     
        },
        {
          path: 'editarvendedor/:id',
          name: 'editarvendedor',
          component: EditarVendedor,
          meta: { Auth: true, title: 'EditarVendedor' },
     
        },
        {
          path: 'createvendedor',
          name: 'createvendedor',
          component: CreateVendedor,
          meta: { Auth: true, title: 'CreateVendedor' },
     
        },
        {
          path: 'crearusuariovendedor/:id',
          name: 'crearusuariovendedor',
          props: true,
          component: CrearUsuarioVendedor,
          meta: { Auth: true, title: 'CrearUsuarioVendedor' },
     
        },
        {
          path: 'listaprecio',
          name: 'Listaprecio',
          component: ListaPrecio,
          meta: { Auth: true, title: 'ListaPrecio' },
     
        },
        {
          path: 'editarlistaprecio/:id',
          name: 'editarlistaprecio',
          component: EditarListaPrecio,
          meta: { Auth: true, title: 'EditarListaPrecio' },
     
        },
        {
          path: 'createlistaprecio',
          name: 'createlistaprecio',
          component: CreateListaPrecio,
          meta: { Auth: true, title: 'CreateListaPrecio' },
     
        },
        {
  
          path: 'order',
          name: 'order',
          component: Order,
          meta: { Auth: true, title: 'Order' },
     
        },
        {
          path: 'procesarenvio',
          name: 'procesarenvio',
          component: ProcesarEnvio,
          meta: { Auth: true, title: 'ProcesarEnvio' },
     
        },
        {
          path: 'pedidos',
          name: 'Pedidos',
          component: Pedidos,
          meta: { Auth: true, title: 'Pedidos' },
     
        },
        {
          path: 'articulo',
          name: 'Articulos',
          component: Articulo,
          meta: { Auth: true, title: 'Articulo' },
     
        },
        {
          path: 'editararticulo/:id',
          name: 'editararticulo',
          component: EditarArticulo,
          meta: { Auth: true, title: 'EditarArticulo' },
     
        },
        {
          path: 'updatepassword',
          name: 'updatepassword',
          component: UpdatePassword,
          meta: { Auth: true, title: 'UpdatePassword' },
     
        },
                
      ]
      
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { Auth: false, title: 'Login' },
      beforeEnter: (to?: any, from?: any, next?: any) => {
          // Si existe un token, la sesion existe, por lo cual, redirecciona a home
          if (!!window.localStorage.getItem('_token')) {
            next({ path: '/' });
          } else {
            next();
          }
      },
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      props: true,
      meta: { Auth: true, title: 'Logout' },
    },
 
    

     
    
  ]
})


router.beforeEach((to?:any, from?:any, next?:any) => {
 document.title = to.meta.title;
 ///console.log(!!http.defaults.headers.common['Authorization'])
  if (to.meta.Auth && !window.localStorage.getItem('_token')) {
    
    next({ path: '/login' });
  } else {
   
    next();
  }

  
});
export default router;