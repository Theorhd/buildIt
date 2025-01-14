import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ProjectInterface } from "../../utils/interfaces";

export default function Settings() {

    // Récupération du projet passé par ProjectLink
    const [project, setProject] = useState<ProjectInterface>();
    useEffect(() => {
        const newProject: ProjectInterface = location.state?.project

        if (newProject) {
            setProject(newProject);
        }
    })
    
    const [projectName, setProjectName] = useState("Projet 1");
    const [description, setDescription] = useState("Description du projet...");
    const [link, setLink] = useState("https://build-it.com/partage/Gr43TR53Vr");

    const [usersPending, setUsersPending] = useState([
        {
            pseudo: "LouisE",
            tagname: "louiservay",
            avatar: "https://i.pravatar.cc/150?u=louiservay"
        },
        {
            pseudo: "ThéoR",
            tagname: "theorichard",
            avatar: "https://i.pravatar.cc/150?u=theorichard"
        },
        {
            pseudo: "JulienC",
            tagname: "juliencharpentier",
            avatar: "https://i.pravatar.cc/150?u=juliencharpentier"
        },
        {
            pseudo: "MaelB",
            tagname: "maelbelliard",
            avatar: "https://i.pravatar.cc/150?u=maelbelliard"
        },
    ]);

    const { t } = useTranslation();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Logique pour sauvegarder les modifications
      console.log({ projectName, description });
    };

    function generateRandomString() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 10) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    const generateNewLink = () => {
        let newLink = generateRandomString();
        // Vérifier si le lien n'existe pas déjà
        while(newLink === link) {
            if (newLink !== link) {
                break;
            }
            newLink = generateRandomString();
        }
        setLink('https://build-it.com/partage/' + newLink);
    }

    const declineInvitation = (tagname: string) => {
        setUsersPending(usersPending.filter(user => user.tagname !== tagname));
    }

    const acceptInvitation = (tagname: string) => {
        setUsersPending(usersPending.filter(user => user.tagname !== tagname));
    }
  
    return (
      <div className="flex items-center justify-center px-2">
        <div className="w-full">
            {/* Titre */}
            <h2 className="text-3xl font-bold my-6">
                {t("Update project")}
            </h2>
  
            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom du projet */}
                <div>
                    <label
                        htmlFor="projectName"
                        className="block text-sm font-medium mb-2"
                    >
                        {t("Name of the project")}
                    </label>
                    <input
                        id="projectName"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full px-4 py-2 bg-bgPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Entrez le nom du projet"
                    />
                </div>
  
                {/* Description */}
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium mb-2"
                    >
                        {t("Description")}
                    </label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 bg-bgPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Entrez une description"
                    />
                </div>


                {/* Link for share the project */}
                <div>
                    <label
                        htmlFor="share-link"
                        className="block text-sm font-medium mb-2"
                    >
                        {t("Share link")}
                    </label>
                    <input
                        id="share-link"
                        type="text"
                        value={link}
                        disabled
                        className="w-full disabled:text-gray-400 disabled:cursor-not-allowed px-4 py-2 bg-bgPrimary rounded-md mb-2"
                    />
                    <div className="flex justify-start space-x-4">
                        <button
                            type="button"
                            onClick={generateNewLink}
                            className="px-4 py-1 text-gray-300 bg-gray-600 hover:bg-gray-500 rounded-md transition"
                        >
                            {t("Generate new link")}
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-secondary rounded-md transition"
                            onClick={() => {navigator.clipboard.writeText(link)}}
                        >
                            {t("Copy link")}
                        </button>
                    </div>
                </div>

  
                {/* Boutons */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-4 py-2 text-gray-300 bg-gray-600 hover:bg-gray-500 rounded-md transition"
                    >
                        {t("Cancel")}
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-secondary rounded-md transition"
                    >
                        {t("Save")}
                    </button>
                </div>
            </form>

            {/* Invitation pending */}
            <h2 className="text-3xl font-bold my-6">
                {t("Invitation pending")}
            </h2>
            <div className="">
                {usersPending && usersPending.length > 0 ? usersPending.map((user) => (
                    <div key={user.tagname} className="inline-block w-1/3 ">
                        <div className="flex items-center justify-between bg-bgPrimary rounded-md p-4 m-2">
                        <div className="flex items-center gap-4 ">
                            <img src={user.avatar} className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center"/>
                            <span className="font-semibold">{user.pseudo}</span>
                            <span className="text-secondary">@{user.tagname}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <XMarkIcon onClick={() => {declineInvitation(user.tagname)}} className="w-8 h-8 p-1 text-red-600 rounded-md cursor-pointer hover:bg-bgSecondary" />
                            <CheckIcon onClick={() => {acceptInvitation(user.tagname)}} className="w-8 h-8 p-1 text-secondary rounded-md cursor-pointer hover:bg-bgSecondary" />
                        </div>
                        </div>
                    </div>
                ))
                : <span className="text-gray-400">{t("No invitation pending")}</span>}
            </div>

            {/* Delete project*/}
            <div className="">
                <h2 className="text-3xl font-bold my-6">{t("Danger Zone")}</h2>
                <button type="button" className="text-red-600 font-semibold border border-red-600 px-4 py-2 rounded-md hover:text-primary hover:bg-red-600">{t("Delete project")}</button>
            </div>
        </div>
      </div>
    );
};