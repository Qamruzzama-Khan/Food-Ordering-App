import { useEffect, useState } from "react";
import Card from "./Card";
import { getItemsByRestaurant } from "../../services/api/item";

const List = ({restaurantId}) => {
    const [items, setItems] = useState();
  
    useEffect(() => {
      const getItems = async () => {
        const response = await getItemsByRestaurant(restaurantId);
        console.log(response.data.data);
        setItems(response.data.data);
      };
      getItems();
    }, []);

  return (
    <div className="flex gap-2 flex-wrap md:gap-4   justify-center">
      {items && items.length > 0 ? (
        items.map((item) => <Card key={item._id} item={item} />)
      ) : (
        <p className="text-gray-500">No items to display.</p>
      )}
    </div>
  );
};

export default List;