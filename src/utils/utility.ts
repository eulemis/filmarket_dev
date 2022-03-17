import { http} from '@/utils/http';
import { User } from '@/store/interfaces/User';
import { Menu } from '@/store/interfaces/Menu';
import { SubMenu } from '@/store/interfaces/SubMenu';

import sessionModule from '@/store/modules/sessionModule'

export async function fetchUser(): Promise<User> {
    
    const response = await http.get('users/me')
    return (response.data.data as User)
  }

  export async function fetchSubMenu(id:number): Promise<SubMenu> {
    
    const response = await http.get(`roles/${id}/submenus?include=menu`)
    return (response.data.data as SubMenu)
  }


 

  