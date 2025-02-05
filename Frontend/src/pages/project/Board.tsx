import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
    BoardInterface,
    ListInterface,
    ItemInterface,
} from "../../utils/interfaces";
import {
    addList,
    apiDeleteList,
    apiUpdateList,
    apiUpdateItem,
    getBoard,
} from "../../utils/api_router";
import List from "../../components/List";
import ListModal from "../../components/modale/ListModale";

export default function Board() {
    const location = useLocation(); // Permet de récupérer l'état de navigation
    const { board_name } = useParams(); // Permet de récupérer le nom de la board depuis l'URL
    const [board, setBoard] = useState<BoardInterface | null>(null); // Stocke la board actuelle
    const [lists, setLists] = useState<ListInterface[]>([]); // Stocke les listes
    const [selectedItem, setSelectedItem] = useState<{
        item: ItemInterface;
        list: ListInterface;
    } | null>(null);

    // Récupérer le nouveau board depuis le state passé
    const board_id: number = location.state?.board_id;

    // Charger les listes depuis le backend lorsque la board change
    useEffect(() => {
        const loadBoard = async () => {
            try {
                const newBoard = await getBoard(board_id);
                setBoard(newBoard);
                setLists(newBoard.lists);
            } catch (error) {
                console.error("Error fetching board:", error);
            }
        };
        loadBoard();
    }, [location.state]); // Déclencher à chaque changement d'URL ou de state
    // Ajouter une nouvelle liste
    const addNewList = async () => {
        if (!board) return;

        // Création de la nouvelle list
        const newList: ListInterface = {
            list_name: "New List",
            board_id: board.id,
        };

        // Ajout de la list en base de donnée
        const validatedList = await addList(newList);

        // Ajout de la list au front
        setLists([...lists, validatedList]);

        console.log("New list added:", validatedList.id);
    };

    // Supprimer une liste
    const deleteList = (listId: number) => {
        // Création de la liste à supprimer
        const listToDelete: Partial<ListInterface> = {
            id: listId,
        };

        // Supprime la liste en base de donnée
        apiDeleteList(listToDelete);

        // Suppression de la list du front
        setLists(lists.filter((list) => list.id !== listId));
        console.log("List deleted:", listId);
    };

    // Mettre à jour une liste spécifique
    const updateList = (updatedList: ListInterface) => {
        // validatedList = apiUpdateList(updatedList);
        setLists(
            lists.map((list) =>
                list.id === updatedList.id ? updatedList : list
            )
        );
    };

    const updateListInDatabase = (updatedList: ListInterface) => {
        apiUpdateList(updatedList);
        console.log("List updated in database:", updatedList.id);
    };

    if (!board) {
        return <div>Loading...</div>; // Afficher un loader pendant la récupération des données
    }

    const updateItemDetails = async (
        list: ListInterface,
        itemId: number,
        details: ItemInterface
    ) => {
        // Appel de la route de mise à jour de l'item
        const validatedItem = await apiUpdateItem(details);

        // Met à jour la list du front
        const updatedItems = list.items.map((item) =>
            item.id === itemId ? { ...item, ...validatedItem } : item
        );
        updateList({ ...list, items: updatedItems });

        console.log("Item updated:", validatedItem.id);
    };

    // Si aucune board n'est sélectionnée, afficher un loader
    if (!board) {
        return <div>Loading...</div>;
    }
    return (
        <div className="relative h-full flex">
            <ol className="absolute flex flex-row top-0 bottom-0 right-0 left-0 pt-16 px-4 pb-6 my-2 overflow-x-auto overflow-y-hidden select-none whitespace-nowrap">
                {lists.map((list) => (
                    <List
                        key={list.id}
                        list={list}
                        deleteList={deleteList}
                        updateList={updateList}
                        updateListInDatabase={updateListInDatabase}
                        setSelectedItem={setSelectedItem}
                    />
                ))}

                <div className="h-full block shrink-0 self-start px-2">
                    <button
                        onClick={addNewList}
                        className="list w-64 h-24 drop-shadow-lg flex items-center justify-center gap-2 whitespace-nowrap bg-bgPrimary rounded-md"
                    >
                        <PlusCircleIcon className="size-8 mr-5 text-secondary" />
                        <p className="text-secondary font-bold text-md md:text-l">
                            Add New List
                        </p>
                    </button>
                </div>
            </ol>

            {/* Affichage de la modal si un item est sélectionné */}
            {selectedItem && (
                <ListModal
                    item={selectedItem.item}
                    onClose={() => setSelectedItem(null)}
                    onSave={(details: ItemInterface) =>
                        updateItemDetails(
                            selectedItem!.list,
                            selectedItem!.item.id as number,
                            details
                        )
                    }
                />
            )}
        </div>
    );
}
