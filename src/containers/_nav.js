export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil:library-building',
      },
  

      {
        _name: 'CSidebarNavDropdown',
        name: 'Configuración General',
        route: '/base',
        icon: 'cil-settings',
        items: [
          {
            name: 'Parámetros Generales',
            to: '/parametros'
          },
          {
            name: 'Usuarios',
            to: '/usuarios'
          },
          {
            name: 'Vendedores',
            to: '/vendedor'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Inventario',
        route: '/base',
        icon: 'cil-puzzle',
        items: [
          {
            name: 'Articulos',
            to: '/articulo'
          },
          {
            name: 'Lista de Precios',
            to: '/listaprecio'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Fuerza de Ventas ',
        route: '/base',
        icon: 'cil-speedometer',
        items: [
          {
            name: 'Clientes',
            to: '/cliente'
          },
          {
            name: 'Contactos',
            to: '/contacto'
          },
          {
            name: 'Orders',
            to: '/order'
          }
        ]
      },
    ]
  }
]

