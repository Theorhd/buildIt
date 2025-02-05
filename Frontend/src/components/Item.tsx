import { ItemInterface, ListInterface } from "../utils/interfaces";

export default function Item({
    item,
    list,
    setSelectedItem,
    deleteItem,
}: {
    item: ItemInterface;
    list: ListInterface;
    setSelectedItem: React.Dispatch<
        React.SetStateAction<{
            list: ListInterface;
            item: ItemInterface;
        } | null>
    >;
    deleteItem: (item_id: number | undefined) => void;
}) {
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

    const statusOptions = ["To Do", "In Progress", "Done"];

    return (
        <li
            className="bg-bgSecondary py-4 px-5 mb-2 rounded-md drop-shadow-lg relative cursor-pointer"
            key={item.id}
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
                    deleteItem(item.id);
                }}
                className="absolute top-1 right-4 text-gray-400 transition-all hover:text-white focus:outline-none border-none"
            >
                &#x2715;
            </button>

            {/* Affichage des tags */}
            <div className="flex gap-2">
                {item.tags?.map((tag) => (
                    <span
                        key={tag.id}
                        className="text-xs rounded-md px-2 py-1"
                        style={{ backgroundColor: tag.color }}
                    >
                        {tag.tag_name}
                    </span>
                ))}
            </div>

            <div className="flex flex-col">
                <p className="text-center pt-5 mb-5 text-wrap">
                    {item.item_name}
                </p>
                <p
                    className={`text-center text-sm uppercase ${getStatusClass(
                        item.status
                    )}`}
                >
                    {item.status}
                </p>
            </div>
        </li>
    );
}
