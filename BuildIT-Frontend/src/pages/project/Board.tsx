import { useLocation } from "react-router-dom";
import List from "../../components/List";
import "../../App.css";

export default function Board() {
  const location = useLocation(); // Récupérer les données passées en state

  // Vérifier si les données sont bien passées
  const board = location.state?.board;

  console.log(board);

  // En cas de rechargement ou navigation directe sans state
  if (!board) {
    return <div>Board non trouvé ou rafraîchissement détecté.</div>;
  }

  return (
    <div className="pt-16 h-full">
      <List board={board} />
    </div>
  );
}
