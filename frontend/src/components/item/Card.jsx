import { useNavigate } from "react-router-dom";
import { inrFormat } from "../../utils/InrFormat";

const Card = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="border border-gray-400 rounded-lg h-[203px] md:h-[223px] w-[144px] md:w-[170px] shadow-xl">
      <img className="h-[103px] md:h-[118px] rounded-lg w-full object-cover" src={item.image.imageUrl} alt="item-image" />
     <div className="p-1 md:p-2">
       <p className="text-gray-800 font-semibold text-sm capitalize">{item.name}</p>
       <p className="text-gray-600 text-sm mt-1">Price: {inrFormat(item.price)}</p>
      <button className="cursor-pointer bg-gray-200 text-gray-700  text-sm p-2 w-full rounded-lg hover:bg-orange-500 hover:text-white mt-2" onClick={() => navigate(`/item-details/${item._id}`)}>View Details</button>
     </div>
    </div>
  );
};

export default Card;
