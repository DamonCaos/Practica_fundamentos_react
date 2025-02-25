import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAdvert } from "../Redux/slices/advertsSlice";
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

  const handleDelete = useCallback((advertId: string) => {
    if (window.confirm("Are you sure you want to delete this advert?")) {
      dispatch(deleteAdvert(advertId));
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Adverts</h2>
      {adverts.length === 0 ? (
        <p data-testid="no-adverts-message">No adverts yet</p> // ✅ Mensaje cuando no hay anuncios
      ) : (
        <ul>
          {adverts.map((advert) => (
            <li key={advert.id}>
              <Link to={`/advert/${advert.id}`}>
                <h3>{advert.name}</h3>
              </Link>
              <p>Price: {advert.price} €</p>
              {advert.photo && <img src={advert.photo} alt={advert.name} width="100" />}
              <button 
                onClick={() => handleDelete(advert.id)} 
                aria-label={`Delete ${advert.name}`}
              >
                ❌ Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdvertsList;
