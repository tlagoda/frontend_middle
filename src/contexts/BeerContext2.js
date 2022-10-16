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
    const arrayOfBeers = [];
    fetch(API_URL + pageToFetch)
      .then((res) => res.json())
      .then((data) => {
        Object.keys(data).forEach((key) => {
          arrayOfBeers.push({ ...data[key], quantityInCart: 0 });
        });
        setBeersToDisplay(arrayOfBeers);
      });
      console.log(beersToDisplay)
  }, [pageToFetch]);

  

  const removeBeerFromCart = (id) => {
    const newCart = beersInCart;
    console.log(beersInCart);
    let beerHasBeenRemoved = false;
    beersInCart.forEach((beer) => {
      // on cherche la bière voulue via son ID
      if (beer.id === id && !beerHasBeenRemoved) {
        // on assigne cette bière à newCart
        newCart.splice(beersInCart.indexOf(beer), 1);
        setBeersInCart(newCart);
        beerHasBeenRemoved = true;
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

  const countBeersInCart = (id) => {
    let count = 0;
    Object.keys(beersInCart).forEach((key) => {
      if (beersInCart[key].id === id) {
        count += 1;
      }
    });
    return count;
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
    countBeersInCart,
  };

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
};
