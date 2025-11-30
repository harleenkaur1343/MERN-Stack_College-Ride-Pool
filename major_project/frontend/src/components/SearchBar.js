import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import places from "./SearchData";
import SearchResults from "./SearchResults";
import { useAuthContest } from "../hooks/useAuthContext";

const SearchBar = () => {
  const { user } = useAuthContest();
  const [locality, setLocality] = useState("");
  const [locError, setLocError] = useState("");
  const [fetchRes, setFetchRes] = useState([]);
  const items = [
    // {
    //   id: "0",
    //   area: "Bhai Randhir Singh Nagar",
    //   pincode: "141012",
    //   city: "Ludhiana",
    //   state: "Punjab",
    // },
  ];
  const locations = places;

  //const [isTrue, setIsTrue] = useState(false);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    //console.log(string, results);
    if (string == "") {
      setFetchRes([
        {
          name: "",
          location: "",
          urn: 0,
          role: "",
        },
      ]);
    }
  };

  const handleOnHover = (result) => {
    // the item hovered
  };

  const handleOnSelect = async (item) => {
    setLocality(item.area);
    let url = `${process.env.REACT_APP_API_BASE_URL}/user/location/?loc=${item.area}`;

    try {
      if (!user) {
        throw new Error("No user found ubering through the location");
      }

      if (user) {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const locResults = await response.json();
        console.log("Loc results ", locResults);

        if (locResults.error) {
          //setIsTrue(false);
          throw new Error(locResults.error);
        } else {
          //setIsTrue(true);
          let datawrap = locResults.map((val) => ({
            name: val.name,
            urn: val.urn,
            location: val.location,
            branch: val.branch,
            year: val.year,
            _id: val._id,
            role: "offerer",
          }));

          //check for logged in user here n remove it from search results
          datawrap = datawrap.filter((val) => {
            return val.urn !== user.urn;
            //console.log(val.urn)
          });
          if (datawrap.length == 0) {
            throw new Error("No user found ubering through the location");
          } else {
            setFetchRes(datawrap);
            setLocError("");
          }

          console.log("Results of search");
          console.log(datawrap);
        }
      }
    } catch (error) {
      setLocError(error.message);

      // console.log("Search resuults err", error.response);
      //  console.log("Search resuults err", error);
      // console.log("Search resuults err", error.request);
      // console.log("Search resuults err", error.message);
    }
  };

  const handleOnFocus = () => {};

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.area}, {item.pincode}, {item.city}
        </span>
      </>
    );
  };

  return (
    <>
      <div style={{ width: "90%" }}>
        <ReactSearchAutocomplete
          items={locations}
          fuseOptions={{ keys: ["area"] }} // Search on both fields
          resultStringKeyName="area"
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          placeholder="Search your location"
        />
      </div>
      <SearchResults
        locerror={locError}
        person={fetchRes}
        setLocError={setLocError}
      ></SearchResults>
    </>
  );
};

export default SearchBar;
