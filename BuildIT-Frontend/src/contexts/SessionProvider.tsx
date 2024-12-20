import { 
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode
} from 'react';
import { useNavigate } from "react-router-dom";

interface UserType {
    id: number,
    pseudo: string,
    mail: string
}

interface TokenType {
    access: string | null,
    refresh: string | null
}

interface SessionType {
    user: UserType | null,
    token: TokenType | null
}

interface SessionContextType {
    session: SessionType | null,
    login: (mail: string, password: string) => void,
    logout: () => void
}

export const SessionContext = createContext<SessionContextType>(undefined!);

export default function SessionProvider({ children } : { children: ReactNode }) {
    const [session, setSession] = useState<SessionType>({
        user: null,
        token: { access: null, refresh: null },
    });
    const navigate = useNavigate();

    // Vérifie et charge le token au démarrage
    useEffect(() => {
        const storedTokens = localStorage.getItem("tokens");
        
        if (storedTokens) {
            const tokens: TokenType = JSON.parse(storedTokens);
            
            // Exemple : Valider le token avec le backend
            validateToken(tokens).then((userData) => {
                if (userData) {
                    setSession({ user: userData, token: { access: tokens.access, refresh: tokens.refresh }});
                } else {
                    logout(); // Déconnecte l'utilisateur si le token est invalide
                }
            });
        }
    });

    const validateToken = async (tokens: TokenType) => {
        try {
            const response = await fetch(`${process.env.API_URL}token/validate`, {
                headers: { Authorization: `Token ${tokens.access}` },
            });
            if (response.ok) {
                const data = await response.json();
                return data.user; // Renvoie l'utilisateur si valide
            }
            return null;
        } catch {
            return null;
        }
    };

    const login = async (mail: string, password: string) => {
        const response = await fetch(`${process.env.API_URL}user/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mail, password }),
        });
    
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("tokens", data.token);
            setSession({ user: data.user, token: data.token });
            navigate("/");
        }
    };
    
    const logout = () => {
        localStorage.removeItem("tokens");
        setSession({ user: null, token: { access: null, refresh: null }})
        navigate("/login");
    };

    return (
        <SessionContext.Provider value={{ session, login, logout }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => useContext(SessionContext);