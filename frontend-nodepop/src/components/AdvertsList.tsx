import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAdvert } from "../Redux/slices/advertsSilce";
import { AppDispatch } from "../Redux/store";

interface Advert {
  id: string;
  name: string;
  price: number;
  photo?: string;
}

interface AdvertsListProps {
  adverts: Advert[];
}

const AdvertsList: React.FC<AdvertsListProps> = ({ adverts }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (advertId: string) => {
    if (window.confirm("Are you sure you want to delete this advert?")) {
      dispatch(deleteAdvert(advertId));
    }
  };

  return (
    <div>
      <h2>Adverts</h2>
      <ul>
        {adverts.map((advert) => (
          <li key={advert.id}>
            <Link to={`/advert/${advert.id}`}>
              <h3>{advert.name}</h3>
            </Link>
            <p>Price: {advert.price} €</p>
            {advert.photo && <img src={advert.photo} alt={advert.name} width="100" />}
            <button onClick={() => handleDelete(advert.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvertsList;
