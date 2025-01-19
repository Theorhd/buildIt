import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
    ListInterface,
    ItemInterface,
    TagInterface,
} from "../utils/interfaces";
import { apiAddItem, apiDeleteItem } from "../utils/api_router";
import "../styles/List.css"; // Ajout explicite du CSS manquant
import Item from "./Item";

export default function List({
    list,
    deleteList,
    updateList,
    updateListInDatabase,
    setSelectedItem,
}: {
    list: ListInterface;
    deleteList: (listId: number) => void;
    updateList: (list: ListInterface) => void;
    updateListInDatabase: (list: ListInterface) => void;
    setSelectedItem: ({
        item,
        list,
    }: {
        item: ItemInterface;
        list: ListInterface;
    }) => void;
}) {
    const [itemNameInput, setItemNameInput] = useState("");

    const statusOptions = ["To Do", "In Progress", "Done"];

    // Ajouter un item
    const addItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Si le champ est vide, on quite la fonction
        if (itemNameInput.trim() === "") {
            return;
        }

        // On crée l'item selon un item Interface
        const newItem: Partial<ItemInterface> = {
            item_name: itemNameInput,
            list_id: list.id,
        };

        // On ajoute l'item dans la base de donnée
        const validatedItem = await apiAddItem(newItem);
        console.log("Item added to database:", validatedItem.id);

        setItemNameInput("");

        // On met à jour la liste du board pour le front
        const updatedList = {
            ...list,
            items: [...list.items, validatedItem],
        };
        updateList(updatedList);
    };

    // Supprimer un item
    const deleteItem = (item_id: number) => {
        // Suppression de l'item en base de donnée
        const itemToDelete: Partial<ItemInterface> = {
            id: item_id,
        };
        apiDeleteItem(itemToDelete);

        // Suppression de l'item du front via le board
        const updatedItems = list.items.filter((item) => item.id !== item_id);
        updateList({ ...list, items: updatedItems });

        console.log("Item deleted:", item_id);
    };

    // Mettre à jour un item dans la base de donnée
    // Appelée lorsque on sors de l'input
    const recallTitle = () => {
        updateListInDatabase(list);
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
                            console.error(
                                "Erreur : l'ID de la liste est manquant."
                            );
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
                        value={list.list_name}
                        onBlur={recallTitle}
                        onChange={(e) =>
                            updateList({ ...list, list_name: e.target.value })
                        }
                    />

                    <PencilIcon className="size-4 absolute right-12" />
                </div>

                <ol className="flex flex-col overflow-x-hidden w-full overflow-y-auto">
                    {list.items &&
                        list.items.map((item) => (
                            <Item
                                item={item}
                                list={list}
                                setSelectedItem={setSelectedItem}
                                deleteItem={deleteItem}
                                key={item.id}
                            />
                        ))}
                </ol>

                <form className="list-add-item mt-4" onSubmit={addItem}>
                    <input
                        type="text"
                        placeholder="Add an item"
                        value={itemNameInput}
                        onChange={(e) => setItemNameInput(e.target.value)}
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
