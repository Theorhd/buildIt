import { useParams } from "react-router-dom";

export default function Board() {

    const { board_name } = useParams();

  return (
    <div>
        <h3>{board_name}</h3>
    </div>
  )
}