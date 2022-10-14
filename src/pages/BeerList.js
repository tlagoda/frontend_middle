import React, { useEffect, useState } from "react";
import BeerCard from "../components/BeerCard";
import { useBeer } from "../contexts/BeerContext";
import "./BeerList.css";

function BeerList() {
  const { beersToDisplay, pageToFetch, setPageToFetch } = useBeer();

  // on va à la prochaine page si la dernière page n'est pas atteinte
  const handleNext = () => {
    if (pageToFetch < 13) {
      setPageToFetch(pageToFetch + 1);
      // scroll en haut de la page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  //on revient à la page précédente si on est pas à la première page
  const handlePrevious = () => {
    if (pageToFetch > 1) {
      setPageToFetch(pageToFetch - 1);
      // scroll en haut de la page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="beerlist-wrapper">
      <span>Page {pageToFetch}</span>
      <div className="beerlist">
        {Object.keys(beersToDisplay).map((key) => (
          <BeerCard
            key={key}
            name={beersToDisplay[key].name}
            image={beersToDisplay[key].image_url}
            volume={beersToDisplay[key].volume.value}
            unit={beersToDisplay[key].volume.unit}
            id={beersToDisplay[key].id}
            displayedInCart={false}
          />
        ))}
      </div>

      <div className="pagination-div">
        <button onClick={handlePrevious}>Previous Page</button>
        <span>PAGE {pageToFetch}</span>
        <button onClick={handleNext}>Next Page</button>
      </div>
    </div>
  );
}

export default BeerList;
