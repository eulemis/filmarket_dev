import {Link} from './Response'


export interface Menu {
    id: number;
    name: string;
    title: string;
    order: string;
    icon: string;
    route: string;
    children: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: any;
    links?: Link[];
}



