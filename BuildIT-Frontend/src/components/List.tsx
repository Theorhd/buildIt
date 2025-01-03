import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ListInterface, ItemInterface, TagInterface } from "../utils/interfaces";
import "../styles/List.css"; // Ajout explicite du CSS manquant

export default function List({
  list,
  deleteList,
  updateList,
  setSelectedItem,
}: {
  list: ListInterface;
  deleteList: (listId: number) => void;
  updateList: (list: ListInterface) => void;
  setSelectedItem: ({ item, list }: { item: ItemInterface; list: ListInterface }) => void;
}) {
  const [itemValues, setItemValues] = useState<{ [key: number]: string }>({});

  const statusOptions = ["To Do", "In Progress", "Done"];

  // Ajouter un item
  const addItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (itemValues[list.id]?.trim() !== "") {
      const newItem: ItemInterface = {
        id: Date.now(),
        item_name: itemValues[list.id],
        description: "",
        status: "To Do",
        placement: list.items.length,
        created_by: 1, // Exemple, à remplacer avec un vrai ID utilisateur
        creation_date: new Date().toISOString(),
        list: list.id,
      };
      const updatedList = {
        ...list,
        items: [...list.items, newItem],
      };
      updateList(updatedList);
      setItemValues({ ...itemValues, [list.id]: "" });
    }
  };

  // Supprimer un item
  const deleteItem = (itemIndex: number) => {
    const updatedItems = list.items.filter((_, index) => index !== itemIndex);
    updateList({ ...list, items: updatedItems });
  };

  // Effacer le titre
  const clearTitle = () => {
    updateList({ ...list, list_name: "" });
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
    }
  };

  return (
    <li className="list h-full block px-2 shrink-0 self-start drop-shadow-lg whitespace-nowrap">
      <div className="w-64 flex relative flex-col bg-bgPrimary rounded-md p-4 max-h-full scroll-m-2">
        <button
          onClick={() => deleteList(list.id)}
          className="absolute top-1 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
        >
          &#x2715;
        </button>

        <div id="list-title" className="flex items-center pb-4">
          <input
            className="text-secondary font-montserrat list-input"
            placeholder="List name"
            value={list.list_name}
            onClick={clearTitle}
            onChange={(e) =>
              updateList({ ...list, list_name: e.target.value })
            }
          />
          <PencilIcon className="size-4 absolute right-12" />
        </div>

        <ol className="flex flex-col overflow-x-hidden overflow-y-auto">
          {list.items.map((item, itemIndex) => (
            <li
              className="bg-bgSecondary py-4 px-5 mb-2 rounded-md drop-shadow-lg relative cursor-pointer"
              key={itemIndex}
              onClick={() =>
                setSelectedItem({
                  list: list,
                  item: item,
                })
              }
            >
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
          ))}
        </ol>

        <form className="list-add-item mt-4" onSubmit={addItem}>
          <input
            type="text"
            placeholder="Add an item"
            value={itemValues[list.id] || ""}
            onChange={(e) =>
              setItemValues({ ...itemValues, [list.id]: e.target.value })
            }
            className="list-input w-full text-primary"
          />
          <button type="submit" className="drop-shadow-lg pl-6 btn-comp text-xs">
            Add Item
          </button>
        </form>
      </div>
    </li>
  );
}
