import React from "react";

//Hacemos este listado como componente que solo rendereciza el listado, para que sea más modular y reutilizable

interface Advert {
  id: string;
  name: string;
  price: number;
  photo?: string;
}

interface AdvertsListProps {
  adverts: Advert[]; // 🟢 Definimos que `adverts` es un array de `Advert`
}

const AdvertsList: React.FC<AdvertsListProps> = ({ adverts }) => {
  return (
    <div>
      <h2>Adverts</h2>
      <ul>
        {adverts.map((advert) => (
          <li key={advert.id}>
            <h3>{advert.name}</h3>
            <p>Price: {advert.price} €</p>
            {advert.photo && <img src={advert.photo} alt={advert.name} width="100" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvertsList;

