import axios from "axios";

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

    const refresh = localStorage.getItem('refresh');
    const response = await api.post("/token/refresh", { refresh: refresh });

    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
};

// Gestion des erreurs
const handleError = async (error: any) => {
    // Si l'erreur est une réponse de l'API
    if (error.response) {
        console.error("Erreur de réponse API:", error.response);

        // Vérifie si le code d'erreur est 498 (Token expiré ou invalide)
        if (error.response.status === 498) {
            try {
                // Tentative de refresh du token
                await refresh();

                // Récupération des nouveaux tokens et réessai de la requête originale
                const newAccessToken = localStorage.getItem('access');
                error.config.headers['Authorization'] = `Token ${newAccessToken}`;
                return api.request(error.config); // Réessaie la requête initiale
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                // window.location.href = '/login'; // Redirige vers la page de connexion 
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
};

// Fonctions pour les appels API

// Login
export async function login(mail: string, password: string) {
    try {
      const response = await api.post("/user/login",{ mail: mail, password: password });
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

// Récupérer les projets de l'utilisateur connecté
export async function getProjectsFromToken() {
    try {
      const response = await api.get(`/project/get_from_token`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};
