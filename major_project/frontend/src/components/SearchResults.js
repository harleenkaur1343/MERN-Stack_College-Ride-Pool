import React from 'react'

const SearchResults = ({person}) => {
        
        console.log("person");
        console.log(person);

        const infoBoxContent = person.map(per => 
                <div className='search_result_cont' style={{
                    padding:"16px",
                    borderRadius:"16px",
                    color:"#4d4d4d",
                    width:"580px",
                    margin:"20px 0px",
                    boxShadow:"0px 2px 8px 0px #cfcfcf"
                }}>
                    <h6 style={{
                        marginBottom:"5px"
                    }}>Name : {per.name}</h6>
                    <p style={{
                        fontSize:"16px",
                        margin:"0px"
                    }}>Locality : {per.location} </p>
                    <p style={{
                        fontSize:"16px"
                    }}>Offer : Free </p>
                </div>
            );

    return(
        <div>{person[1] && infoBoxContent}
        {person.length<=1 && 
        <div className='no-results'>
            <img src='https://img.freepik.com/premium-vector/gps-navigation-concept-tiny-people-search-location-online-map-we-have-moved-city-landscape_501813-163.jpg?w=360' 
                style={{width:'330px',marginBottom:'20px',marginTop:'20px'}}
            />
            <p style={{textAlign:'center', color:'#2F3AB6', fontSize:'20px',fontFamily:"Tilt Neon"}}>Start your Search</p>
        </div>}
        </div>
    )
}
export default SearchResults;