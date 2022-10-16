import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBeer } from "../contexts/BeerContext";
import "./BeerCard.css";

function BeerCard({ name, image, volume, unit, id, displayedInCart }) {
  const {
    beersToDisplay,
    addBeerToCart,
    removeBeerFromCart,
    isInCart,
    countBeersInCart,
  } = useBeer();
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [countInCart, setCountInCart] = useState(0);

  useEffect(() => {
    // on vérifie si la bière est déjà dans le panier
    setAlreadyInCart(isInCart(id));
  }, [beersToDisplay]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/details", { state: { id: id, alreadyInCart: alreadyInCart } });
    // scroll vers le haut de la page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAdd = (id) => {
    setAlreadyInCart(isInCart(id));
    setCountInCart(countBeersInCart(id))
  };

  const handleRemove = (id) => {
    setAlreadyInCart(isInCart(id));
    setCountInCart(countBeersInCart(id))
  };

  return (
    <div className="card">
      <h2>{name}</h2>
      {volume && (
        <span>
          Volume : {volume} {unit}
        </span>
      )}
      <img src={image} alt="" />
      <h3 onClick={handleClick}>SEE DETAILS</h3>
      {alreadyInCart ? (
        <span>Already in your cart (x{countBeersInCart(id)})</span>
      ) : null}
      {!displayedInCart ? (
        <div className="add-remove-div">
          <button
            onClick={() => {
              addBeerToCart(id);
              handleAdd(id);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              removeBeerFromCart(id);
              handleRemove(id);
            }}
          >
            -
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default BeerCard;
