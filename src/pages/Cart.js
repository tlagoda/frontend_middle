import React, { useEffect, useState } from "react";
import { useBeer } from "../contexts/BeerContext";
import BeerCard from "../components/BeerCard";
import "./Cart.css";

function CART() {
  const { beersInCart, countBeersInCart, isInCart } = useBeer();

  useEffect(() => {
    beersInCart.map((beer) => {
      console.log(beer.quantityInCart);
    });
  });

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
      {beersInCart.map((beer) => {
        if (beer.quantityInCart === 1) {
          return (
            <BeerCard
              key={beer.id}
              id={beer.id}
              name={beer.name}
              image={beer.image_url}
              displayedInCart={true}
              quantityInCart={beer.quantityInCart}
            />
          );
        }
      })}
    </div>
  );
}

export default CART;
