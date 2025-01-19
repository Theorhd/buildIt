import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import ConfirmModale from "../../components/modale/ConfirmModale";
import { deleteProject, updateProject } from "../../utils/api_router";
import { useProjectContext } from "../../context/ProjectContext";

export default function Settings() {
    const { triggerProjectUpdate } = useProjectContext(); // Utilisation du contexte

    // Récupération du projet passé par ProjectLink
    const project = useLocation().state.project;

    const [formData, setFormData] = useState({
        project_name: project.project_name,
        tagname: project.tagname,
        description: project.description,
        markdown: project.markdown || "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la modale

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProject(formData);
            setSuccessMessage(
                t("Your information has been successfully updated.")
            );
            triggerProjectUpdate();
            console.log(response, project);
        } catch (error) {
            setError("Error: " + error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-center px-2">
            <div className="w-full">
                {/* Titre */}
                <h2 className="text-3xl font-bold my-6">
                    {t("Update project")}
                </h2>

                {successMessage && (
                    <div className="mb-4 p-3 text-green-800 bg-green-100 border border-green-400 rounded">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 text-red-800 bg-red-100 border border-red-400 rounded">
                        {error}
                    </div>
                )}

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nom du projet */}
                    <div>
                        <label
                            htmlFor="project_name"
                            className="block text-sm font-medium mb-2"
                        >
                            {t("Name of the project")}
                        </label>
                        <input
                            id="project_name"
                            name="project_name"
                            type="text"
                            value={formData.project_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-bgPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Entrez le nom du projet"
                        />
                    </div>

                    {/* Tagname */}
                    <div>
                        <label
                            htmlFor="tagname"
                            className="block text-sm font-medium mb-2"
                        >
                            {t("Tagname")}
                        </label>
                        <input
                            id="tagname"
                            name="tagname"
                            type="text"
                            value={formData.tagname}
                            className="w-full px-4 py-2 text-gray-600 bg-bgPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary cursor-not-allowed"
                            disabled
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
                            name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-bgPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Entrez une description"
                        />
                    </div>

                    {/* Markdown */}
                    <div>
                        <label
                            htmlFor="markdown"
                            className="block text-sm font-medium mb-2"
                        >
                            {t("Description plus précise")}
                        </label>
                        <textarea
                            id="markdown"
                            name="markdown"
                            value={formData.markdown}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-bgPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Entrez une description plus précise. Markdown autorisé."
                            rows={5}
                        ></textarea>
                    </div>

                    {/* Boutons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-secondary rounded-md transition"
                        >
                            {t("Save")}
                        </button>
                    </div>
                </form>

                {/* Delete project*/}
                <div className="">
                    <h2 className="text-3xl font-bold my-6">
                        {t("Danger Zone")}
                    </h2>
                    <button
                        type="button"
                        className="text-red-600 font-semibold border border-red-600 px-4 py-2 rounded-md hover:text-primary hover:bg-red-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {t("Delete project")}
                    </button>
                </div>
            </div>
            {/* Modale */}
            {isModalOpen && (
                <ConfirmModale
                    onSave={() => deleteProject()}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
