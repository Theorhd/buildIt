import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { deleteUser, getUserFromToken, logout, updateUser } from "../utils/api_router";
import ConfirmModale from "../components/Modale/ConfirmModale";

export default function Account() {

  const [formData, setFormData] = useState({
    pseudo: "",
    tagname: "",
    firstname: "",
    lastname: "",
    mail: "",
    phone: "",
    password: "",
    new_password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la modale

  // Utilisation de useEffect pour récupérer les projets
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUserFromToken().then((fetchedUser) => {
          Object.entries(fetchedUser).forEach(([key, value]) => {
            if(key in formData) {
              setFormData((prevFormData) => ({
                ...prevFormData,
                [key]: value,
              }));
            }
          });
        });
      } catch (err) {
        setError("Failed to load user : " + err);
      }
    };

    fetchUser();
  }, []); // Le tableau vide [] garantit que l'effet est exécuté une seule fois

  const handleSubmit = (e) => {
    e.preventDefault()
    if(validate()){
      try {
        updateUser(formData);
        setSuccessMessage(t("Your information has been successfully updated."));
      } catch (error) {
        setError("Error: " + error)
      }
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {

    // if (!/\d/.test(formData.new_password) || formData.new_password.length < 6) {
    //   setError(t("The password must contain a number and be at least 6 characters long"))
    //   return false;
    // }

    if (formData.new_password !== formData.confirmPassword) {
      setError(t("Passwords do not match"))
      return false;
    }

    return true;

  }

      const { t } = useTranslation();
    
      return (
        <div className="h-full overflow-y-auto">
          <div className="w-full p-16">
            <h2 className="text-3xl font-semibold mb-6">
              {t("Update my account")}
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
    
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pseudo */}
                <div>
                    <label
                    htmlFor="pseudo"
                    className="block text-sm font-medium"
                    >
                    {t("Nickname")}
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
                {/* Tagname */}
                <div>
                    <label
                    htmlFor="tagname"
                    className="block text-sm font-medium"
                    >
                    {t("Tagname")}
                    </label>
                    <input
                    type="text"
                    id="tagname"
                    name="tagname"
                    value={formData.tagname}
                    className="mt-1 p-3 block w-full text-gray-600 bg-bgPrimary rounded-md border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary cursor-not-allowed"
                    disabled
                    />
                </div>
                <div className="flex space-between gap-5">
                    {/* Prénom */}
                    <div className="w-1/2">
                        <label
                        htmlFor="firstname"
                        className="block text-sm font-medium"
                        >
                        {t("Firstname")}
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
                        {t("Lastname")}
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
                  {t("Email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.mail}
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
                  {t("Phone")}
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
                  htmlFor="new_password"
                  className="block text-sm font-medium"
                >
                  {t("New password")}
                </label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  placeholder={t("Leave blank to not modify")}
                  className="mt-1 p-3 block w-full bg-bgPrimary rounded-md border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary"
                />
              </div>
    
              {/* Confirmer le mot de passe */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium"
                >
                  {t("Confirm new password")}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t("Confirm new password")}
                  className="mt-1 p-3 block w-full bg-bgPrimary rounded-md border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary"
                />
              </div>
              {/* Confirmer avec le mot de passe actuel */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                >
                  {t("Current password")}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("Confirm changes with current password")}
                  className="mt-1 p-3 block w-full bg-bgPrimary rounded-md border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary"
                />
              </div>
    
              {/* Bouton Soumettre */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-secondary text-white rounded-md shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  {t("Save changes")}
                </button>
              </div>
            </form>

            {/* Delete account*/}
            <div className="">
                <h2 className="text-3xl font-bold my-6">{t("Danger Zone")}</h2>
                <div className="flex flex-col gap-4">
                  <button type="button" className="w-fit text-red-600 font-semibold border border-red-600 px-4 py-2 rounded-md hover:text-primary hover:bg-red-600" onClick={logout}>{t("Logout")}</button>
                  <button type="button" className="w-fit text-red-600 font-semibold border border-red-600 px-4 py-2 rounded-md hover:text-primary hover:bg-red-600" onClick={() => setIsModalOpen(true)}>{t("Delete account")}</button>
                </div>
            </div>
          </div>

          {/* Modale */}
          {isModalOpen && (
            <ConfirmModale
              onSave={() => deleteUser()}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      );
    }