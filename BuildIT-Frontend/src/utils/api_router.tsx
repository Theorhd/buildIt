import axios from "axios";

import {
    UserInterface,
    ListInterface,
    ItemInterface,
    TagInterface,
    ProjectInterface,
} from "./interfaces";

// Définir la base URL de l'API
const API_BASE_URL = "http://localhost:8000/api"; // Remplace avec l'URL de ton backend

// Configurer une instance Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Ajouter un intercepteur pour inclure automatiquement le token JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access"); // Récupère le token
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Refresh de token
export async function refresh() {
    const refresh = localStorage.getItem("refresh");
    const response = await api.post("/token/refresh", { refresh: refresh });

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
}

// Gestion des erreurs
async function handleError(error: any) {
    // Si l'erreur est une réponse de l'API
    if (error.response) {
        console.error("Erreur de réponse API:", error.response);

        // Vérifie si le code d'erreur est 498 (Token expiré ou invalide)
        if (error.response.status === 498) {
            try {
                // Tentative de refresh du token
                await refresh();

                // Récupération des nouveaux tokens et réessai de la requête originale
                const newAccessToken = localStorage.getItem("access");
                error.config.headers[
                    "Authorization"
                ] = `Token ${newAccessToken}`;
                window.location.reload();
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                logout(); // Déconnecte l'utilisateur si le refresh échoue
            }
        }
    }

    // Si l'erreur est liée à la requête (pas de réponse reçue)
    else if (error.request) {
        console.error("Erreur de requête API:", error.request);
    }

    // Autres types d'erreurs (configuration, réseau, etc.)
    else {
        console.error("Erreur:", error.message);
    }

    throw error; // Propage l'erreur après traitement
}

// Fonctions pour les appels API

export async function login(mail: string, password: string) {
    /*
    Authentifier un utilisateur

    Required fields:
    - mail
    - password
    */
    try {
        const response = await api.post("/user/login", {
            mail: mail,
            password: password,
        });
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem("access", response.data.access);
        window.location.href = "/";
    } catch (error) {
        handleError(error);
    }
}

export async function register(data: UserInterface) {
    /*
    Créer un nouvel utilisateur

    Required fields:
    - mail
    - password
    - pseudo
    - tagname
    */
    try {
        const response = await api.post("/user/create", data);

        console.log("Account created successfully");
        window.location.href = "/login";
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

// Logout
export function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    window.location.href = "/login";
}

export async function getUserFromToken() {
    /*
  Récupérer l'utilisateur connecté via le token
  */
    try {
        const response = await api.get(`/user/get_from_token`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getUserFromID(id: number) {
    /*
    Récupérer l'utilisateur connecté via l'ID
    */
    try {
        const response = await api.get(`/user/get/` + id);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function updateUser(data: UserInterface) {
    /* */
    try {
        const response = await api.put("/user/update", data);

        console.log("User updated successfully");
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteUser() {
    /* */
    try {
        const response = await api.delete("/user/delete");

        logout();
        console.log("Account deleted successfully");
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getProjectsFromToken() {
    /*
    Récupérer les projets de l'utilisateur connecté via le token
    */
    try {
        const response = await api.get(`/project/get_from_token`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getProjectFromTagname(tagname: string | undefined) {
    /*
    Récupérer les projets de l'utilisateur connecté via le token
    */
    try {
        const response = await api.get(`/project/get_from_tagname/` + tagname);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function updateProject(data: ProjectInterface) {
    try {
        const response = await api.put("/project/update", data);

        console.log("Project update successfully");
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteProject() {
    /* */
    try {
        const response = await api.delete("/project/delete");

        console.log("Project deleted successfully");
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getUsersFromProjectID(projectID: number) {
    /* Get Users from Project ID */
    try {
        const response = await api.get("/project/get_users/" + projectID);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

// Crée un Thread
export async function createThread() {
    try {
        const response = await api.post("/assistant/create-thread");
        return response.data.thread_id;
    } catch (error) {
        handleError(error);
    }
}

// Met à jour le Thread et récupère le message de l'IA
export async function updateThread(threadID: any, content: any) {
    try {
        const response = await api.post("/assistant/update-run-thread", {
            thread_id: threadID,
            content: content,
        });
        const get_response = await api.post(
            "/assistant/get-assistant-response",
            {
                thread_id: threadID,
                run_id: response.data.run_id,
            }
        );
        return get_response.data.assistant_reply;
    } catch (error) {
        handleError(error);
    }
}

// Process du message final de l'IA pour crée projets [*IAModale.tsx / Ligne 101-127*]
export async function processMessage(finalResponse: any, threadID: any) {
    try {
        const response = await api.post("/project/create", finalResponse);
        if (response.status === 201) {
            const deleteThread = await api.post("/assistant/delete-thread", {
                thread_id: threadID,
            });
            console.log(deleteThread.data);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        handleError(error);
    }
}

export async function addUserToProject(projectID: number, userTagName: string) {
    /*
    Ajoute un utilisateur à un projet
    
    Required fields:
    - project_id
    - user tagname
    */
    try {
        const response = await api.post("/project/add_user", {
            project_id: projectID,
            user_tagname: userTagName,
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function acceptInvitation(projectID: number) {
    /*
    Accepte une invitation à un projet
    
    Required fields:
    - project_id
    */
    try {
        const response = await api.post("/project/accept_invitation", {
            project_id: projectID,
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function declineInvitation(projectID: number) {
    /*
    Refuse une invitation à un projet
    
    Required fields:
    - project_id
    */
    try {
        const response = await api.post("/project/reject_invitation", {
            project_id: projectID,
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function retriveUserWithTagName(tagname: string) {
    /*
    Récupère un utilisateur via son tagname
    
    Required fields:
    - tagname
    */
    try {
        const response = await api.post("/user/retrive/tagname", {
            tagname: tagname,
        });
        return response.data.exists;
    } catch (error) {
        handleError(error);
    }
}

export async function addNewBoard(projectID: number, boardName: string) {
    /*
    Ajoute un nouveau tableau à un projet
    
    Required fields:
    - project_id
    - board_name
    */
    try {
        const response = await api.post("/board/create", {
            project_id: projectID,
            board_name: boardName,
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function addList(data: ListInterface) {
    /*
    Ajoute une nouvelle liste
    
    Required fields:
    - board_id
    - list_name
    */
    try {
        const response = await api.post("/list/create", data);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

export async function apiUpdateList(data: ListInterface) {
    /*
    Modifie la liste depuis son ID
    
    Required fields:
    - id

    Ne prend pas en compte les items
    */
    try {
        if (data.items !== null) delete data.items;
        data = { ...data, id: data.id };
        const response = await api.put("/list/update", data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function apiDeleteList(data: ListInterface) {
    /*
    Supprime la liste depuis son ID
  */
    try {
        console.log(data);
        const response = await api.delete(`/list/delete/${data.id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function apiAddItem(data: ItemInterface) {
    /*
    Ajoute un nouvel item
    
    Required fields:
    - list_id
    - item_name
    */
    try {
        console.log(data);
        const response = await api.post("/item/create", data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function apiUpdateItem(data: ItemInterface) {
    /*
    Modifie l'item depuis son ID
    
    Required fields:
    - id
    */
    try {
        // Si il y a des tags, on les supprime car le back ne les prend pas en compte
        if (data.tags !== null) delete data.tags;

        // Rajout de item_id car il est nécéssaire pour les permissions dans le back
        data = { ...data, item_id: data.id };

        // Modifie l'iten et rend le nouvel item
        const response = await api.put("/item/update", data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function apiDeleteItem(data: ItemInterface) {
    /*
    Supprime l'item depuis son ID
    
    Required fields:
    - id
    */
    try {
        const response = await api.delete("/item/delete/" + data.id);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function apiAddTag(data: { tag: TagInterface; item_id: number }) {
    /*
    Ajoute un nouveau tag
    
    Required fields:
    ==> tag:
        - tag_name
        - color
    
    - item_id
    */
    try {
        const response = await api.post("/tag/create", data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function updateTag(data: TagInterface) {
    /*
    Modifie le tag depuis son ID
    
    Required fields:
    - id
    */
    try {
        const response = await api.put("/tag/update", data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function apiDeleteTag(data: TagInterface) {
    /*
    Supprime le tag depuis son ID
    
    Required fields:
    - id
    */
    try {
        const response = await api.delete("/tag/delete/" + data.id);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getBoard(board_id: number) {
    /*
    Récupère un tableau via son ID
    
    Required fields:
    - board_id
    */
    try {
        const response = await api.get("/board/get/" + board_id);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}
