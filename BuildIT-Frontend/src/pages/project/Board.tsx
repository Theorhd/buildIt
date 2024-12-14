// import { useParams } from "react-router-dom";
import List from "../../components/List";
import "../../App.css";

export default function Board() {
  // const { board_name } = useParams();

  return (
    <div className="pt-16 h-full">
      <List />
    </div>
  );
}
