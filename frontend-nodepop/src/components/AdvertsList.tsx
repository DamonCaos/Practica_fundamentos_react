import React from "react";
import { Link } from "react-router-dom";

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvertsList;

