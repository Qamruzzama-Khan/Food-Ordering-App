import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"
import { getItem } from "../services/api/item";
import Details from "../components/item/Details";

const ItemDetails = () => {
  const {itemId} = useParams();
  const [item, setItem] = useState();

   useEffect(() => {
    const getOneItem = async () => {
      const response = await getItem(itemId);
      setItem(response.data.data);
      console.log(response.data.data)
    };
    getOneItem();
  }, []);

  return (
    <div>
     {item &&  <Details item={item} />}
    </div>
  )
}

export default ItemDetails
