import Vue from 'vue';
import Router from 'vue-router';
// Containers
const TheContainer = () => import('@/containers/TheContainer.vue');
// Views
const Dashboard = () => import('@/views/dashboard/Dashboard.vue');
// Users
const Login = () => import('@/views/auth/Login.vue');
const Logout = () => import('@/views/auth/Logout.vue');
const MenuIndex = () => import('@/views/menu/Index.vue');
const SubmenuIndex = () => import('@/views/submenu/Index.vue');
const ListUsers = () => import('@/views/users/List.vue');
// Errors
const Page404 = () => import('@/views/errors/Page404.vue');
const Page500 = () => import('@/views/errors/Page500.vue');
Vue.use(Router);
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
                    path: 'menu',
                    name: 'Menu',
                    component: MenuIndex,
                    meta: { Auth: true, title: 'Menu' },
                },
                {
                    path: 'submenu',
                    name: 'Submenu',
                    component: SubmenuIndex,
                    meta: { Auth: true, title: 'Submenu' },
                },
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: { Auth: false, title: 'Login' },
            beforeEnter: (to, from, next) => {
                // Si existe un token, la sesion existe, por lo cual, redirecciona a home
                if (!!window.localStorage.getItem('_token')) {
                    next({ path: '/' });
                }
                else {
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
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    ///console.log(!!http.defaults.headers.common['Authorization'])
    if (to.meta.Auth && !window.localStorage.getItem('_token')) {
        next({ path: '/login' });
    }
    else {
        next();
    }
});
export default router;
//# sourceMappingURL=index.js.map