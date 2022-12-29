import React, { useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Helmet } from 'react-helmet';
import "./index.scss";

function CreateOffer() {
  const user = useContext(UserContext);

  const [offer, setOffer] = useState({
    companyName: "",
    title: "",
    description: "",
    remote: false,
    locationName: "",
    keywords: "",
    techStack: "",
    jobType: {
      fullTime: false,
      partTime: false,
      contract: false,
    },
    salary: "",
    email: "",
  });

  const onChange = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "remote") {
      setOffer((prevState) => ({
        ...prevState,
        [name]: !offer[name],
      }));
    } else if (name === "jobType") {
      setOffer((prevState) => ({
        ...prevState,
        jobType: {
          ...prevState.jobType,
          [value]: !offer.jobType[value],
        },
      }));
    } else {
      setOffer((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(
      `${process.env.REACT_APP_FIREBASE_API_REALTIME_DATABASE}/offers.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(offer),
      }
    );

    setOffer({
      companyName: "",
      title: "",
      description: "",
      remote: false,
      locationName: "",
      keywords: "",
      techStack: "",
      jobType: {
        fullTime: false,
        partTime: false,
        contract: false,
      },
      salary: "",
      email: "",
    });
  };

  return (
    <main>
      <Helmet>
        <title>Create Offer</title>
      </Helmet>
      {!user ? (
        <>
          <h1 className="info">Please log in if you want to post a job.</h1>
        </>
      ) : (
          <form onSubmit={onSubmit} className="form">
            <div className="basicInformation">
              <label htmlFor="companyName">Company name:</label>
              <input
                type="text"
                name="companyName"
                onChange={(event) => onChange(event)}
                required
              />
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                onChange={(event) => onChange(event)}
                required
              />
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                onChange={(event) => onChange(event)}
                required
              />
            </div>
            <div className="location">
              <div className="remote">
                <label htmlFor="remote">Remote:</label>
                <input
                  type="checkbox"
                  name="remote"
                  onChange={(event) => onChange(event)}
                />
              </div>
              <label htmlFor="locationName">Location:</label>
              <input
                type="text"
                name="locationName"
                onChange={(event) => onChange(event)}
                required
              />
            </div>
            <div className="keywords">
              <label htmlFor="keywords">Keywords:</label>
              <textarea
                name="keywords"
                onChange={(event) => onChange(event)}
                required
              />
            </div>
            <div className="techStack">
              <label htmlFor="techStack">Tech stack:</label>
              <textarea
                name="techStack"
                onChange={(event) => onChange(event)}
                required
              />
            </div>
            <div className="jobType">
              <input
                type="radio"
                value="fullTime"
                checked={offer.jobType.value}
                name="jobType"
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="fullTime">Full time</label>
              <input
                type="radio"
                value="partTime"
                checked={offer.jobType.value}
                name="jobType"
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="partTime">Part time</label>
              <input
                type="radio"
                value="contract"
                checked={offer.jobType.value}
                name="jobType"
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="contract">Contract</label>
            </div>
            <div className="salary">
              <input
                type="radio"
                value="5000"
                name="salary"
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="5000">Max: 5000</label>
              <input
                type="radio"
                value="10000"
                name="salary"
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="10000">Max: 10000</label>
              <input
                type="radio"
                value="15000"
                name="salary"
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="15000">Max: 15000</label>
              <input
                type="radio"
                value="20000"
                name="salary"
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="20000">Max: 20000</label>
              <input
                type="radio"
                value="25000"
                name="salary"
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="25000">Max: 25000</label>
            </div>
            <div className="contact">
              <label htmlFor="email">Email for candidates:</label>
              <input
                type="email"
                name="email"
                onChange={(event) => onChange(event)}
                required
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
      )}
    </main>
  );
}

export default CreateOffer;
