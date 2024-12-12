import { useParams } from "react-router-dom";
import List from "../../components/List";
import "../../App.css";

export default function Board() {
  const { board_name } = useParams();

  return (
    <div>
      <h3 className="bg-bgSecondary relative">{board_name}</h3>
      <List />
    </div>
  );
}
