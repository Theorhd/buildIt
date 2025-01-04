export interface TagInterface {
    id?: number;
    tag_name: string; // max length = 22
    color: string; // max length = 7 - Code hexa - exemple: #000000
    project_id?: number;
}

export interface ItemInterface {
    id?: number;
    item_name: string; // max length = 31
    description?: string;
    priority?: number; // 
    status: string;
    risk?: string;
    effort?: string;
    placement?: number; // géré par le back
    date_start?: string;
    date_end?: string;
    created_by?: number; // Read only
    creation_date: string; // Format ISO - Read only
    list: ListInterface; // Read only
    list_id?: number;  // Write only
    tags: TagInterface[];
}

export interface ListInterface {
    id?: number;
    list_name: string; // max length = 22
    placement?: number; // Read only
    board_id?: number; // Write only
    board: BoardInterface; // Read only
    items: ItemInterface[];
}

export interface BoardInterface {
    id?: number;
    board_name: string; // max lenght = 22
    placement?: number; // géré par le back
    project_id?: number; // Write only
    project: ProjectInterface; // Read only
    chatroom?: number;
    lists: ListInterface[];
}

export interface ProjectInterface {
    id?: number;
    project_name: string; // max length = 22
    tagname: string;
    description?: string;
    created_by?: UserInterface; // Read only
    creation_date?: string; // Format ISO - Read only
    boards: BoardInterface[];
}

export interface UserInterface {
    id?: number;
    tagname: string; // max length = 22
    firstname: string; // max length = 50
    lastname: string; // max length = 50
    email: string;
    password?: string; // Write only
}