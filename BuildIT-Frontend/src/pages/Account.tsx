import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Account() {
    const [formData, setFormData] = useState({
        pseudo: "JD",
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        phone: "0606060606",
        password: "",
        confirmPassword: "",
      });
    
      const [successMessage, setSuccessMessage] = useState("");

      const { t } = useTranslation();
    
      const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (formData.password && formData.password !== formData.confirmPassword) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }
    
        // Simuler une requête API pour sauvegarder les modifications
        console.log("Données envoyées :", formData);
        setSuccessMessage("Vos informations ont été mises à jour avec succès.");
      };
    
      return (
        <div className="flex justify-center items-center">
          <div className="w-full p-8">
            <h2 className="text-3xl font-semibold mb-6">
              {t("Update my account")}
            </h2>
    
            {successMessage && (
              <div className="mb-4 p-3 text-green-800 bg-green-100 border border-green-400 rounded">
                {successMessage}
              </div>
            )}
    
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pseudo */}
                <div>
                    <label
                    htmlFor="pseudo"
                    className="block text-sm font-medium"
                    >
                    Pseudo
                    </label>
                    <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={formData.pseudo}
                    onChange={handleChange}
                    className="mt-1 p-3 block w-full bg-bgPrimary rounded-md border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary"
                    />
                </div>
                <div className="flex space-between gap-5">
                    {/* Prénom */}
                    <div className="w-1/2">
                        <label
                        htmlFor="firstname"
                        className="block text-sm font-medium"
                        >
                        Firstname
                        </label>
                        <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full bg-bgPrimary rounded-md border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary"
                        />
                    </div>
                    
                    {/* Nom */}
                    <div className="w-1/2">
                        <label
                        htmlFor="lastname"
                        className="block text-sm font-medium"
                        >
                        Lastname
                        </label>
                        <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full bg-bgPrimary rounded-md border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary"
                        />
                    </div>
              </div>
    
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full bg-bgPrimary rounded-md border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full bg-bgPrimary rounded-md border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary"
                />
              </div>
    
              {/* Nouveau mot de passe */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                >
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Laisser vide pour ne pas modifier"
                  className="mt-1 p-3 block w-full bg-bgPrimary rounded-md border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary"
                />
              </div>
    
              {/* Confirmer le mot de passe */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmer le nouveau mot de passe"
                  className="mt-1 p-3 block w-full bg-bgPrimary rounded-md border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary"
                />
              </div>
    
              {/* Bouton Soumettre */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-secondary text-white rounded-md shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  Sauvegarder les modifications
                </button>
              </div>
            </form>

            {/* Delete account*/}
            <div className="">
                <h2 className="text-3xl font-bold my-6">{t("Danger Zone")}</h2>
                <button type="button" className="text-red-600 font-semibold border border-red-600 px-4 py-2 rounded-md hover:text-primary hover:bg-red-600">{t("Delete account")}</button>
            </div>
          </div>
        </div>
      );
    }