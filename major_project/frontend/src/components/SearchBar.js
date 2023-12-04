import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import places from "./SearchData";
import SearchResults from "./SearchResults";
import {useAuthContest} from '../hooks/useAuthContext';

const SearchBar = () => {

  const { user } = useAuthContest();
  const [locality, setLocality] = useState("");
  const items = [
    {
      id: "0",
      area: "Bhai Randhir Singh Nagar",
      pincode: "141012",
      city: "Ludhiana",
      state: "Punjab",
    },
  ];
  const locations = places;
  const [fetchRes, setFetchRes] = useState([]);
  const [isTrue, setIsTrue]=useState(false);


  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
    if(string=="")
    {
      setFetchRes([{
        name:"",
        location:"",
        urn:0,
        role:""
      }]);
    }
    
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };
  
  const handleOnSelect = async (item) => {
    
    // the item selected
    console.log("Area : " + item.area);
    setLocality(item.area);
    let url = "http://localhost:3000/user/location/?loc=" + locality;

    try{
      if(user)
      {
        const locResults = await fetch(url,{
          method: 'GET',
          headers: {'Content-Type': 'application/json','Authorization':`Bearer ${user.token}`}
      })
          .then((locResult) => {
            const result = locResult.json();
            console.log("result is this");
            console.log(result);
            return result;
          })
          .then((value) => {
            if (value.error !== undefined) {
              setIsTrue(false)
              throw new Error(value.error);
            } else {
              setIsTrue(true);
                let dataWrap= []
                value.map((val) => {
                  dataWrap.push(
                    {
                    name: val.name,
                    urn: val.urn,
                    location: val.location,
                    role: "offerer",
                  });         
                });
                //console.log(dataWrap);
              setFetchRes(dataWrap)  ;
              console.log("Results of search")
              console.log(fetchRes);
            }
          })
          .catch((err) => {
            console.log("inside error");
            console.log("Your Error : " + err);
            //console.log(err);
          });
      }
    }catch(err)
    {
      alert(err);
    }
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

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
      <div style={{ width: "700px", marginTop: "100px" }}>
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
        />
      </div>
      <SearchResults person={fetchRes}></SearchResults>
      
    </>
  );
};

export default SearchBar;
