export interface TagInterface {
    id?: number;
    tag_name: string;
    color: string;
}

export interface ItemInterface {
    id?: number;
    item_name: string;
    description: string;
    priority?: number;
    status: string;
    risk?: string;
    effort?: string;
    placement: number;
    date_start?: string;
    date_end?: string;
    created_by: number;
    creation_date: string; // Format ISO
    list: number;
    tags: TagInterface[];
}

export interface ListInterface {
    id?: number;
    list_name: string;
    board: number;
    items: ItemInterface[];
}

export interface BoardInterface {
    id?: number;
    board_name: string;
    placement: number;
    project: number;
    chatroom?: number;
    lists: ListInterface[];
}

export interface ProjectInterface {
    id?: number;
    project_name: string;
    tagname: string;
    description: string;
    created_by: number;
    creation_date: string; // Format ISO
    boards: BoardInterface[];
}