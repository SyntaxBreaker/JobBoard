import React, { useState, useEffect } from "react";
import SearchBar from "../../Components/SearchBar";
import JobList from "../../Components/JobList";
import "./index.scss";

function Homepage() {
  const [filters, setFilters] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState(null);
  const [offers, setOffers] = useState({});
  const [amountOfOffers, setAmountOfOffers] = useState(0);
  const [amountOfFilteredOffers, setAmountOfFilteredOffers] = useState(0);
  const [filteredOffers, setFilteredOffers] = useState({});
  const [renderFilteredOffers, setRenderFilteredOffers] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FIREBASE_API_REALTIME_DATABASE}/offers.json`)
      .then((response) => response.json())
      .then((offers) => {
        if (offers !== null) {
          setOffers(offers);
          setAmountOfOffers(Object.entries(offers).length);
        }
      });
  }, []);

  useEffect(() => {
    const newData = [];
    let filteredData;

    const filterLocation = Object.entries(offers).filter(([key, offer]) => {
      return (
        (isRemote !== false && offer.remote === isRemote) ||
        (location !== "" &&
          offer.locationName.toLowerCase().includes(location.toLowerCase()))
      );
    });

    if (salary === null || salary === "default") {
      filteredData = filterLocation;
    } else {
      if (filterLocation.length !== 0) {
        const filterSalary = filterLocation.filter(([key, offer]) => {
          return parseInt(offer.salary) <= parseInt(salary);
        });
        filteredData = filterSalary;
      } else {
        const filterSalary = Object.entries(offers).filter(([key, offer]) => {
          return parseInt(offer.salary) <= parseInt(salary);
        });
        filteredData = filterSalary;
      }
    }

    if (filters !== "") {
      const findByFilters = Object.entries(offers).filter(([key, offer]) => {
        return (
          offer.companyName
            .toLowerCase()
            .includes(filters.toLocaleLowerCase()) ||
          offer.keywords.toLowerCase().includes(filters.toLowerCase()) ||
          offer.techStack.toLowerCase().includes(filters.toLowerCase())
        );
      });

      if (location !== "") {
        const filterLocation = findByFilters.filter(([key, offer]) => {
          return (
            (isRemote !== false && offer.remote === isRemote) ||
            (location !== "" &&
              offer.locationName.toLowerCase().includes(location.toLowerCase()))
          );
        });

        if (salary === null || salary === "default") {
          filteredData = filterLocation;
        } else {
          const filterSalary = filterLocation.filter(([key, offer]) => {
            return parseInt(offer.salary) <= parseInt(salary);
          });
          filteredData = filterSalary;
        }
      } else {
        if (salary === null || salary === "default") {
          filteredData = findByFilters;
        } else {
          const filterSalary = findByFilters.filter(([key, offer]) => {
            return parseInt(offer.salary) <= parseInt(salary);
          });
          filteredData = filterSalary;
        }
      }
    }

    filteredData.forEach((data) => {
      const id = data[0];
      const properties = data[1];
      let newObject = {
        [id]: {
          ...properties,
        },
      };

      newData.push(newObject);
    });

    setFilteredOffers(Object.assign({}, ...newData));
  }, [filters, isRemote, location, salary]);

  useEffect(() => {
    if (Object.getOwnPropertyNames(filteredOffers).length === 0) {
      setAmountOfOffers(Object.entries(offers).length);
      setAmountOfFilteredOffers(Object.entries(filteredOffers).length);
      setRenderFilteredOffers(false);
    } else {
      setAmountOfOffers(Object.entries(filteredOffers).length);
      setAmountOfFilteredOffers(Object.entries(filteredOffers).length);
      setRenderFilteredOffers(true);
    }

    if (
      filters !== "" ||
      isRemote !== false ||
      (location !== "" && (salary !== "default" || salary !== null))
    ) {
      setRenderFilteredOffers(true);
      setAmountOfFilteredOffers(Object.entries(filteredOffers).length);
    }
  }, [filteredOffers]);

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;

    if (name === "remote") {
      setIsRemote(!isRemote);
    }

    if (name === "location") {
      setLocation(value);
    }

    if (name === "salary") {
      setSalary(value);
    }
  };

  return (
    <main>
      <SearchBar setFilters={setFilters} />
      <div className="homepage__container">
        <JobList
          offers={offers}
          amountOfOffers={amountOfOffers}
          amountOfFilteredOffers={amountOfFilteredOffers}
          filteredOffers={filteredOffers}
          renderFilteredOffers={renderFilteredOffers}
        />
        <div className="filters">
          <div className="location">
            <form>
              <label htmlFor="location">Location:</label>
              <input
                name="location"
                type="text"
                value={location}
                onChange={(event) => onChange(event)}
              />
            </form>
          </div>
          <div className="remote">
            <form>
              <input
                name="remote"
                type="checkbox"
                checked={isRemote}
                onChange={(event) => onChange(event)}
              />
              <label htmlFor="remote">Remote</label>
            </form>
          </div>
          <div className="salary">
            <form>
              <label htmlFor="salary">Salary:</label>
              <select name="salary" onChange={(event) => onChange(event)}>
                <option value="default">No maximum salary</option>
                <option value="5000">Maximum: 5000</option>
                <option value="10000">Maximum: 10000</option>
                <option value="15000">Maximum: 15000</option>
                <option value="20000">Maximum: 20000</option>
                <option value="25000">Maximum: 25000</option>
              </select>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Homepage;
