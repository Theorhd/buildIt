import { createContext, useContext, useState } from "react";

interface ProjectContextProps {
  projectUpdated: boolean;
  triggerProjectUpdate: () => void;
}

// Créez le contexte
const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

// Hook pour utiliser le contexte
export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};

// Fournisseur de contexte
export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [projectUpdated, setProjectUpdated] = useState(false);

  const triggerProjectUpdate = () => {
    setProjectUpdated((prev) => !prev); // Inverse la valeur pour forcer un rafraîchissement
  };

  return (
    <ProjectContext.Provider value={{ projectUpdated, triggerProjectUpdate }}>
      {children}
    </ProjectContext.Provider>
  );
};