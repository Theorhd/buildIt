import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  BoardInterface,
  ListInterface,
  ItemInterface,
} from "../../utils/interfaces";
import {
  createList,
  updateListApi,
  deleteListApi,
  createItem,
  updateItem,
  deleteItemApi,
} from "../../utils/api_router";
import List from "../../components/List";
import ListModal from "../../components/ListModal";

export default function Board() {
  const location = useLocation();
  const { board_name } = useParams(); // Permet de récupérer le nom de la board depuis l'URL
  const [board, setBoard] = useState<BoardInterface | null>(null); // Stocke la board actuelle
  const [lists, setLists] = useState<ListInterface[]>([]); // Stocke les listes
  const [selectedItem, setSelectedItem] = useState<{
    item: ItemInterface;
    list: ListInterface;
  } | null>(null); // Stocke l'item sélectionné pour affichage dans la modal

  // Charger les listes depuis le backend lorsque la board change
  useEffect(() => {
    const newBoard: BoardInterface = location.state?.board; // Récupère la board depuis l'état de navigation
    if (newBoard && newBoard.board_name === board_name) {
      setBoard(newBoard);
      setLists(newBoard.lists);
    }
  }, [location.state, board_name, board]);

  // Ajouter une nouvelle liste
  const addNewList = async () => {
    if (!board) return; // Si aucune board n'est sélectionnée, on ne fait rien

    const newList: Partial<ListInterface> = {
      list_name: "New List",
      board: board.id,
      items: [],
    };

    try {
      const createdList = await createList(newList); // Appel API pour créer une nouvelle liste
      setLists([...lists, createdList]); // Mise à jour des listes locales
    } catch (error) {
      console.error("Erreur lors de la création d'une liste :", error);
    }
  };

  // Supprimer une liste
  const deleteList = async (listId: number) => {
    try {
      await deleteListApi(listId); // Appel API pour supprimer la liste
      setLists(lists.filter((list) => list.id !== listId)); // Mise à jour des listes locales
    } catch (error) {
      console.error("Erreur lors de la suppression de la liste :", error);
    }
  };

  // Mettre à jour une liste
  const updateList = async (updatedList: ListInterface) => {
    try {
      const updatedFromApi = await updateListApi(updatedList); // Appel API pour mettre à jour la liste
      setLists(
        lists.map((list) =>
          list.id === updatedFromApi.id ? updatedFromApi : list
        )
      ); // Mise à jour de la liste locale avec la version API
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste :", error);
    }
  };

  // Ajouter un item à une liste
  const addItem = async (listId: number, newItem: Partial<ItemInterface>) => {
    try {
      const createdItem = await createItem(newItem); // Appel API pour créer un nouvel item
      const updatedList = lists.find((list) => list.id === listId);

      if (updatedList) {
        updateList({
          ...updatedList,
          items: [...updatedList.items, createdItem],
        }); // Mise à jour de la liste avec l'item créé
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'item :", error);
    }
  };

  // Mettre à jour un item existant
  const updateItemDetails = async (
    list: ListInterface,
    itemId: number,
    details: ItemInterface
  ) => {
    try {
      const updatedItem = await updateItem({ ...details, id: itemId }); // Appel API pour mettre à jour l'item
      const updatedItems = list.items.map((item) =>
        item.id === itemId ? updatedItem : item
      );
      updateList({ ...list, items: updatedItems }); // Mise à jour de la liste avec l'item modifié
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'item :", error);
    }
  };

  // Supprimer un item
  const deleteItem = async (listId: number, itemId: number) => {
    try {
      await deleteItemApi(itemId); // Appel API pour supprimer l'item
      const updatedList = lists.find((list) => list.id === listId);
      if (updatedList) {
        updateList({
          ...updatedList,
          items: updatedList.items.filter((item) => item.id !== itemId),
        }); // Mise à jour de la liste sans l'item supprimé
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'item :", error);
    }
  };

  // Si aucune board n'est sélectionnée, afficher un loader
  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-full flex mt-2">
      <ol className="absolute flex flex-row top-0 bottom-0 right-0 left-0 px-4 pb-6 mb-2 overflow-x-auto overflow-y-hidden select-none whitespace-nowrap">
        {lists?.length > 0 &&
          lists.map((list) => (
            <List
              key={list.id}
              list={list}
              deleteList={deleteList}
              updateList={updateList}
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
