import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet'
import "./index.scss";

function Offer() {
  const [offer, setOffer] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_FIREBASE_API_REALTIME_DATABASE}/offers/${id}.json`
    )
      .then((response) => response.json())
      .then((offer) => setOffer(offer));
  }, [id]);

  return (
    <main>
      <Helmet>
        <title>{offer.title}</title>
      </Helmet>
      <div className="offer">
        <div className="information">
          <div className="basic_information">
            <h1>{offer.title}</h1>
            <h2>{offer.companyName}</h2>
          </div>
          <div className="more__information">
            <div>
              <p>Salary:</p>
              <p>{offer.salary}zł</p>
            </div>
            <div>
              <p>Location(s):</p>
              <p>{offer.locationName}</p>
            </div>
            <div>
              <p>Remote:</p>
              <p>{offer.remote === true ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
        <div className="technologies">
          {offer.techStack &&
            offer.techStack.split(", ").map((item) => (
              <div key={item} className="technology">
                <p>{item.toUpperCase()}</p>
              </div>
            ))}
        </div>
        <div className="description">
          <h2>About the work:</h2>
          <p>{offer.description}</p>
        </div>
        {offer.email && (
          <div className="email">
            <h2>Copy and apply by email:</h2>
            <p>{offer.email.toUpperCase()}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Offer;
