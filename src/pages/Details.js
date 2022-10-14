/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useBeer } from "../contexts/BeerContext";
import "./Details.css";

function Details() {
  const { getOneBeerDetails, beersToDisplay } = useBeer();
  // récupération de l'id, transmis via 'navigate' dans BeerCard
  const { state } = useLocation();
  const { id } = state;

  const [beer, setBeer] = useState({});

  // Chaque fois que l'utilisateur change de page, les données sont récupérées afin d'afficher les cards.
  useEffect(() => {
    setBeer(getOneBeerDetails(id));
  }, [beersToDisplay]);

  // Si les infos de la bière n'ont pas pu être chargées
  if (Object.keys(beer).length < 1) {
    return (
      <div>
        <p>Error</p>
        <Link to="/">Get back to beers list ?</Link>
      </div>
    );
  }

  return (
    <div className="details-wrapper">
      <h1>{beer.name}</h1>
      <div className="presentation-div">
        <img src={beer.image_url} alt="" />
        <p>{beer.description}</p>
      </div>
      <h2>
        Volume : {beer.volume.value} {beer.volume.unit}
      </h2>{" "}
      <div className="ingredients-div">
        <h3>Ingredients</h3>
        <br />
        <ul>
          {Object.keys(beer.ingredients).map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </div>
      <div className="brewers-div">
        <h3>Brewer Tips :</h3>
        <br />
        <p>{beer.brewers_tips}</p>
      </div>
    </div>
  );
}

export default Details;
