/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, createContext } from "react";

const API_URL = "https://api.punkapi.com/v2/beers?page=";

const BeerContext = createContext();

export const useBeer = () => {
  return useContext(BeerContext);
};

export const BeerProvider = ({ children }) => {
  const [pageToFetch, setPageToFetch] = useState(1);
  const [beersToDisplay, setBeersToDisplay] = useState({});
  const [beersInCart, setBeersInCart] = useState([]);

  useEffect(() => {
    fetch(API_URL + pageToFetch)
      .then((res) => res.json())
      .then((data) => {
        setBeersToDisplay(data);
      });
  }, [pageToFetch]);

  const addBeerToCart = (id) => {
    let beerToAdd = {};
    const newCart = beersInCart;
    // On sélectionne la bière cliquée parmis les bière affichées
    Object.keys(beersToDisplay).forEach((key) => {
      if (beersToDisplay[key].id === id) {
        // on vérifie que la bière n'est pas déjà dans le panier
        // Si la bière n'est pas dans le panier, on l'ajoute
        if (!isInCart(id)) {
          beerToAdd = beersToDisplay[key];
          newCart.push(beerToAdd);
          setBeersInCart(newCart);
        }
      }
    });
  };

  const getOneBeerDetails = (id) => {
    let selectedBeer = {};
    Object.keys(beersToDisplay).forEach((key) => {
      if (beersToDisplay[key].id === id) {
        selectedBeer = beersToDisplay[key];
      }
    });
    return selectedBeer;
  };

  const removeBeerFromCart = (id) => {
    const newCart = beersInCart;
    beersInCart.forEach((beer) => {
      // on cherche la bière voulue via son ID
      if (beer.id === id) {
        // on assigne cette bière à newCart
        newCart.splice(beersInCart.indexOf(beer), 1);
        setBeersInCart(newCart);
      }
    });
  };

  const isInCart = (id) => {
    let isAlreadyInCart = false;
    beersInCart.forEach((beer) => {
      if (beer.id === id) {
        isAlreadyInCart = true;
      }
    });
    return isAlreadyInCart;
  };

  const value = {
    beersToDisplay,
    beersInCart,
    pageToFetch,
    addBeerToCart,
    removeBeerFromCart,
    isInCart,
    setPageToFetch,
    getOneBeerDetails,
  };

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
};
