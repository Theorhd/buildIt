import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ListInterface, ItemInterface } from "../utils/interfaces";
import "../styles/List.css";

export default function List({
  list,
  deleteList,
  updateList,
  setSelectedItem,
}: {
  list: ListInterface;
  deleteList: (listId: number) => void;
  updateList: (list: ListInterface) => void;
  setSelectedItem: (args: { item: ItemInterface; list: ListInterface }) => void;
}) {
  const [itemValues, setItemValues] = useState<{ [key: number]: string }>({});
  const [localTitle, setLocalTitle] = useState(list.list_name || "");

  // Ajouter un item
  const addItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!list.id) {
      console.error("list.id is undefined");
      return;
    }
    const value = itemValues[list.id]?.trim();
    if (value && value !== "") {
      const newItem: ItemInterface = {
        item_name: value,
        status: "To Do",
        list_id: list.id, // Correction : utilisation de list_id
      };
      const updatedList = {
        ...list,
        items: [...(list.items || []), newItem], // Ajout d'un fallback si list.items est undefined
      };
      updateList(updatedList);
      setItemValues({ ...itemValues, [list.id]: "" });
    }
  };

  // Supprimer un item
  const deleteItem = (itemIndex: number) => {
    const updatedItems = (list.items || []).filter(
      (_, index) => index !== itemIndex
    );
    updateList({ ...list, items: updatedItems });
  };

  // Retourner la classe CSS pour le statut
  const getStatusClass = (status: string) => {
    switch (status) {
      case "To Do":
        return "text-blue-500";
      case "In Progress":
        return "text-yellow-500";
      case "Done":
        return "text-secondary";
      case "Blocked":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <li className="list h-full block px-2 shrink-0 self-start drop-shadow-lg whitespace-nowrap">
      <div className="w-64 flex relative flex-col bg-bgPrimary rounded-md p-4 max-h-full scroll-m-2">
        <button
          onClick={() => {
            if (list.id) {
              console.log("Suppression de la liste" + list.id);
              deleteList(list.id);
            } else {
              console.error("Erreur : l'ID de la liste est manquant.");
            }
          }}
          className="absolute top-1 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
        >
          &#x2715;
        </button>

        <div id="list-title" className="flex items-center pb-4">
          <input
            className="text-secondary font-montserrat list-input"
            placeholder="List name"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)} // Mise à jour de l'état local
            onBlur={() => {
              if (
                localTitle.trim().length > 0 &&
                localTitle.trim().length <= 22
              ) {
                if (localTitle !== list.list_name) {
                  updateList({ ...list, list_name: localTitle });
                }
              } else {
                setLocalTitle(list.list_name); // Réinitialise si invalide
              }
            }}
          />

          <PencilIcon className="size-4 absolute right-12" />
        </div>

        <ol className="flex flex-col overflow-x-hidden overflow-y-auto">
          {(list.items || []).map(
            (
              item,
              itemIndex // Ajout d'un fallback si list.items est undefined
            ) => (
              <li
                className="bg-bgSecondary py-4 px-5 mb-2 rounded-md drop-shadow-lg relative cursor-pointer"
                key={itemIndex}
                onClick={() =>
                  setSelectedItem({
                    list,
                    item,
                  })
                }
              >
                <div className="pb-3">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      style={{ backgroundColor: tag.color }}
                      className="text-xs rounded-md px-2 py-1 mr-2"
                    >
                      {tag.tag_name}
                    </span>
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(itemIndex);
                  }}
                  className="absolute top-1 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
                >
                  &#x2715;
                </button>
                <div className="flex flex-col">
                  <p className="text-center mb-5">{item.item_name}</p>
                  <p
                    className={`text-center text-sm uppercase ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </p>
                </div>
              </li>
            )
          )}
        </ol>

        <form className="list-add-item mt-4" onSubmit={addItem}>
          <input
            type="text"
            placeholder="Add an item"
            value={list.id ? itemValues[list.id] || "" : ""} // Ajout d'un fallback pour éviter undefined
            onChange={(e) =>
              list.id &&
              setItemValues({ ...itemValues, [list.id]: e.target.value })
            }
            className="list-input w-full text-primary"
          />
          <button
            type="submit"
            className="drop-shadow-lg pl-6 btn-comp text-xs"
          >
            Add Item
          </button>
        </form>
      </div>
    </li>
  );
}
