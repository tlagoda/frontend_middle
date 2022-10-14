import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBeer } from "../contexts/BeerContext";
import "./BeerCard.css";

function BeerCard({ name, image, volume, unit, id, displayedInCart }) {
  const { beersToDisplay, addBeerToCart, removeBeerFromCart, isInCart } =
    useBeer();
  const [alreadyInCart, setAlreadyInCart] = useState(false);

  useEffect(() => {
    // on vérifie si la bière est déjà dans le panier
    setAlreadyInCart(isInCart(id));
  }, [beersToDisplay]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/details", { state: { id: id } });
    // scroll vers le haut de la page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAdd = (id) => {
    setAlreadyInCart(isInCart(id));
  };

  const handleRemove = (id) => {
    setAlreadyInCart(false);
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
      {alreadyInCart ? <span>Already in your cart</span> : null}
      {!displayedInCart ? (
        <div className="add-remove-div">
          <button
            onClick={() => {
              addBeerToCart(id);
              handleAdd(id);
            }}
            disabled={alreadyInCart}
          >
            +
          </button>
          <button
            onClick={() => {
              removeBeerFromCart(id);
              handleRemove(id);
            }}
            disabled={!alreadyInCart}
          >
            -
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default BeerCard;
