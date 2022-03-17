import { Link} from './Response'
import { Menu } from './Menu';

export interface SubMenu {
    id: number;
    name: string;
    title: string;
    order: string;
    icon: string;
    to: string;
    menu_id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    links: Link[];
    menu: Menu;
}





