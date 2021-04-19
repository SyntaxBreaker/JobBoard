import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

function JobList({
  offers,
  amountOfOffers,
  amountOfFilteredOffers,
  filteredOffers,
  renderFilteredOffers,
}) {
  return (
    <div className="results">
      {!renderFilteredOffers ? (
        <>
          <p>{amountOfOffers} job offers found!</p>
          {Object.entries(offers).map(([key, offer]) => (
            <div className="job" key={key}>
              <Link to={`/offer/${key}`}>
                <div className="job__info">
                  <div className="basic_info">
                    <h2>{offer.title}</h2>
                  </div>
                  <div className="more_info">
                    <p>{offer.companyName}</p>
                    <p>{offer.salary}zł</p>
                  </div>
                  <div className="location_info">
                    <p>{offer.locationName}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </>
      ) : (
        renderFilteredOffers && (
          <>
            <p>{amountOfFilteredOffers} job offers found!</p>
            {Object.entries(filteredOffers).map(([key, offer]) => (
              <div className="job" key={key}>
                <Link to={`/offer/${key}`}>
                  <div className="job__info">
                    <div className="basic_info">
                      <h2>{offer.title}</h2>
                    </div>
                    <div className="more_info">
                      <p>{offer.companyName}</p>
                      <p>{offer.salary}zł</p>
                    </div>
                    <div className="location_info">
                      <p>{offer.locationName}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        )
      )}
    </div>
  );
}

export default JobList;
