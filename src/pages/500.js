import React from "react";
import { Link } from "react-router-dom";


const Error500 = () => (
  <div className="app-wrapper page-error-container animated slideInUpTiny animation-duration-3">
    <div className="page-error-content">
      <div className="error-code mb-4 animated zoomInDown">500</div>
      <h2 className="text-center fw-regular title bounceIn animation-delay-10 animated">
      Internal Server Error ... 
      it's not you but me!
      </h2>
      <form className="mb-4" role="search">
        <div className="search-bar shadow flipInX animation-delay-16 animated">
          
        </div>
      </form>
      <p className="text-center zoomIn animation-delay-20 animated">
        <Link className="btn btn-primary" to="/">
         Page d'accueil
        </Link>
      </p>
    </div>
  </div>
);

export default Error500;
