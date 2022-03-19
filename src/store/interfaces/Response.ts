export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: Links;
}
export interface Links {
}
export interface Meta {
    pagination: Pagination;
}

export interface Link {
    rel: string;
    href: string;
}
