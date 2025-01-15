import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useProjectContext } from "../../context/ProjectContext";
import { getUsersFromProjectID } from "../../utils/api_router";
import { ProjectUserInterface } from "../../utils/interfaces";
export default function Team() {

  const project = useLocation().state.project

  const [users, setUsers] = useState<ProjectUserInterface>([]);
  const [error, setError] = useState("");
  const { projectUpdated } = useProjectContext();

  useEffect(() => {
      const fetchProjectUsers = async () => {
          try {
              await getUsersFromProjectID(project.id)
              .then((fetchedProjectUsers) => {
                setUsers(fetchedProjectUsers);
              });
          } catch (err) {
              setError("Failed to load user : " + err);
          }
      };

      fetchProjectUsers();
  
  }, [projectUpdated, project.id])

  const filterUsersByRole = (role: string) => {
    return Object.values(users).filter((user: ProjectUserInterface) => user.role === role);
  };

//   const [link, setLink] = useState("https://build-it.com/partage/Gr43TR53Vr");

//   function generateRandomString() {
//       let result = '';
//       const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//       const charactersLength = characters.length;
//       let counter = 0;
//       while (counter < 10) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//         counter += 1;
//       }
//       return result;
//   }

//   const generateNewLink = () => {
//       let newLink = generateRandomString();
//       // Vérifier si le lien n'existe pas déjà
//       while(newLink === link) {
//           if (newLink !== link) {
//               break;
//           }
//           newLink = generateRandomString();
//       }
//       setLink('https://build-it.com/partage/' + newLink);
//   }

//   const acceptInvitation = (tagname: string) => {
//       setUsersPending(usersPending.filter(user => user.tagname !== tagname));
//   }

//   const declineInvitation = (tagname: string) => {
//       setUsersPending(usersPending.filter(user => user.tagname !== tagname));
//   }

  const { t } = useTranslation();

  return (
    <>
        {project && users && (
            <>
                {/* Invitation pending */}
                <h2 className="text-3xl font-bold my-6">
                    {t("Invitation pending")}
                </h2>
                {filterUsersByRole("pending").length > 0 ? (
                    <>
                        {filterUsersByRole("pending").map((user: ProjectUserInterface) => (
                            <div key={user.tagname} className="inline-block w-1/3 ">
                                <div className="flex items-center justify-between bg-bgPrimary rounded-md p-4 m-2">
                                    <div className="flex items-center gap-4">
                                        {/* <img src={user.avatar} className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center"/> */}
                                        <span className="font-semibold">{user.pseudo}</span>
                                        <span className="text-secondary">@{user.tagname}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <XMarkIcon onClick={ () => { declineInvitation(user.id); window.location.reload(); } } className="w-8 h-8 p-1 text-red-600 rounded-md cursor-pointer hover:bg-bgSecondary" />
                                        {/* <CheckIcon onClick={() => {acceptInvitation(user.tagname)}} className="w-8 h-8 p-1 text-secondary rounded-md cursor-pointer hover:bg-bgSecondary" /> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (          
                    <span className="text-gray-400">{t("No invitation pending")}</span>    
                )}
                
                {/* Owner */}
                <h2 className="text-3xl font-bold my-6">
                    {t("Project owner")}
                </h2>
                {filterUsersByRole("owner").length > 0 ? (
                    <>
                        {filterUsersByRole("owner").map((user: ProjectUserInterface) => (
                            <div key={user.tagname} className="inline-block w-1/3 ">
                                <div className="flex items-center justify-between bg-bgPrimary rounded-md p-4 m-2">
                                    <div className="flex items-center gap-4 ">
                                        {/* <img src={user.avatar} className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center"/> */}
                                        <span className="font-semibold">{user.pseudo}</span>
                                        <span className="text-secondary">@{user.tagname}</span>
                                    </div>
                                    <span className="text-gray-600">{user.role}</span>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (          
                    <span className="text-gray-400">{t("No owner")}</span>    
                )}

                {/* Member */}
                <h2 className="text-3xl font-bold my-6">
                    {t("Project member")}
                </h2>
                {filterUsersByRole("member").length > 0 ? (
                    <>
                        {filterUsersByRole("member").map((user: ProjectUserInterface) => (
                            <div key={user.tagname} className="inline-block w-1/3 ">
                                <div className="flex items-center justify-between bg-bgPrimary rounded-md p-4 m-2">
                                    <div className="flex items-center gap-4 ">
                                        {/* <img src={user.avatar} className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center"/> */}
                                        <span className="font-semibold">{user.pseudo}</span>
                                        <span className="text-secondary">@{user.tagname}</span>
                                    </div>
                                    <span className="text-gray-600">{user.role}</span>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (          
                    <span className="text-gray-400">{t("No other member")}</span>    
                )}
          
          {/* Link for share the project */}
          {/* <div>
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
          </div> */}
        </>
      )}
    </>
  )
}