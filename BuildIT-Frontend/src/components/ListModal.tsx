import { useState } from "react";
import { PlusCircleIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import { ItemInterface , TagInterface } from "../utils/interfaces";
import { apiAddTag, apiDeleteTag } from "../utils/api_router";

export default function ListModal({
   item,
   onClose,
   onSave
  }: {
    item: ItemInterface;
    onClose: () => void;
    onSave: (details: ItemInterface) => void;
  }) {
  
  // Liste des tags de l'item actuel
  const [tags, setTags] = useState<TagInterface[]>(item.tags || []);

  // Variables pour modifier un item
  const [description, setDescription] = useState<string>(
    item.description || ""
  );
  const [status, setStatus] = useState<string>(item.status || "In Progress");

  // Variables pour modifier un tag
  const [newTagTitle, setNewTagTitle] = useState<string>("");
  const [newTagColor, setNewTagColor] = useState<string>("#34d399");
  const [showTagInput, setShowTagInput] = useState<boolean>(false);

  // Fonction pour enregistrer l'item
  const saveItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem: Partial<ItemInterface> = {
      id : item.id,
      description : description,
      status : status,
    }
    onSave(newItem);
    onClose();
  };

  // Fonction pour ajouter un tag en base de donnée
  const addNewTag = async () => {
    if (newTagTitle.trim() !== "") {

      // Création d'un tag
      const newTag: Partial<TagInterface> = {
        tag_name: newTagTitle,
        color: newTagColor,
      }

      // Appel de l'API
      const validatedTag = await apiAddTag({
        tag: newTag,
        item_id: item.id
      });

      // Mise à jour de la liste des tags
      setTags([...tags, validatedTag]);

      // Reset les fields pour la création d'un tag
      setNewTagTitle("");
      setNewTagColor("#34d399");

      // Ferme la fenetre pour créer un tag
      setShowTagInput(false);

      console.log("Tag added:", validatedTag.id);
    }
  };

  const deleteTag = (id: number) => {

    // Créer le tag à supprimer
    const tagToDelete: Partial<TagInterface> = {
      id: id
    }

    // Appel de l'API
    apiDeleteTag(tagToDelete);

    // Mise à jour de la liste des tags
    setTags(tags.filter((tag) => tag.id !== id));

    console.log("Tag deleted:", id);
  };

  return (
    <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col relative bg-bgPrimary rounded-md p-6 w-2/6">
        <button
          onClick={onClose}
          className="absolute top-1 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
        >
          &#x2715;
        </button>
        <h2 className="font-bold mb-4">{item.item_name}</h2>
        <hr />
        <div className="flex my-5 gap-5 items-center">
          <div className="flex gap-5 items-center">
            <h2 className="text-xl font-bold">Status:</h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 rounded-md outline-none bg-bgSecondary"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="flex gap-5 items-center">
            <h2 className="text-xl font-bold">Tags:</h2>
            <button
              onClick={() => setShowTagInput(true)}
              className="rounded-md bg-bgSecondary hover:bg-secondary  px-4 text-xs flex items-center"
            >
              <PlusCircleIcon className="size-6 mr-1" />
              Add Tag
            </button>
          </div>
        </div>

        {showTagInput && (
          <div className="flex items-center justify-between gap-2 mb-4">
            <input
              type="text"
              placeholder="Tag Name"
              value={newTagTitle}
              onChange={(e) => setNewTagTitle(e.target.value)}
              className="w-1/2 p-2 text-black rounded-md outline-none"
            />
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <PaintBrushIcon className="revert absolute z-10 size-5 pointer-events-none" />
                <input
                  type="color"
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  className="h-10 w-10 cursor-pointer border-md bg-transparent"
                />
              </div>
              <button
                onClick={addNewTag}
                className="bg-secondary hover:opacity-90 px-4 ml-5 md:ml-2 py-2 rounded-md text-xs"
              >
                Save Tag
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="relative flex items-center justify-center group"
            >
              <span
                className="text-sm rounded-md px-2 py-1"
                style={{ backgroundColor: tag.color }}
              >
                {tag.tag_name}
              </span>
              <button
                onClick={() => deleteTag(tag.id)}
                className="absolute w-full h-full rounded-md z-20 text-gray-400 transition-all hover:text-white focus:outline-none border-none opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: tag.color }}
              >
                &#x2715;
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold my-4">Description:</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-40 p-2 text-white border-none focus:outline-none rounded cursor-auto bg-bgSecondary"
          name="description"
        ></textarea>

        <div className="flex justify-between mt-4">
          <button
            onClick={saveItem}
            className="btn-comp text-xs transition-all"
          >
            Save
          </button>

          <button
            onClick={() => {
              setDescription("");
              setTags([]);
              setStatus("In Progress"); // Réinitialiser le statut
              onClose();
            }}
            className="rounded-md text-xs"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
