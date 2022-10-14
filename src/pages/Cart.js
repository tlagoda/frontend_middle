import React from "react";
import { useBeer } from "../contexts/BeerContext";
import BeerCard from "../components/BeerCard";
import "./Cart.css";

function CART() {
  const { beersInCart } = useBeer();

  // affichage si le panier est vide
  if (beersInCart.length < 1) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "5vh" }}>
        Your cart is empty.
      </h2>
    );
  }

  return (
    <div className="cart-wrapper">
      {beersInCart.map((beer) => (
        <BeerCard
          key={beer.id}
          id={beer.id}
          name={beer.name}
          image={beer.image_url}
          displayedInCart={true}
        />
      ))}
    </div>
  );
}

export default CART;
