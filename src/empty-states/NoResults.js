import React from "react";
import noProductFound from '../images/Noproductfound.JPG'

const NoResults = () => {
  return (
    <div className="products">
      <div className="no-results">
        <img
          src={noProductFound}
          alt="No Result"
        />
        <h2>Sorry, But no product matched your search!</h2>
        <p>Please enter a different word and try again.</p>
      </div>
    </div>
  );
};

export default NoResults;
