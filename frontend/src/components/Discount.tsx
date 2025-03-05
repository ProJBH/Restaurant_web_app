import React from 'react';
import springRoll from '../assets/springrolls.jpg';

const Discount: React.FC = () => {
  return (
    <div id="Discount" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={springRoll} className="d-block w-100" alt="Discounted Dish 1" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Discount Dish 1</h5>
            <p>Special discount description.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="discount2.jpg" className="d-block w-100" alt="Discounted Dish 2" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Discount Dish 2</h5>
            <p>Special discount description.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="discount3.jpg" className="d-block w-100" alt="Discounted Dish 3" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Discount Dish 3</h5>
            <p>Special discount description.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#Discount" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#Discount" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Discount;
