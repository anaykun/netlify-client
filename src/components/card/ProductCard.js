import React from "react";
import { Link } from "react-router-dom";

import convertRupiah from "rupiah-format";

export default function ProductCard({ item, index }) {
  return (
    <Link
      to={`/product/` + item.id}
      className=" col text-decoration-none"
      key={index}
    >
      <div className="col-lg-2 col-md col-sm-5 col mb-2 p-0 " key={item.id}>
        <div className="card card-hover bg-dark text-light ">
          <img className="rounded-top" src={item.image} alt="" />

          <div className="card-body p-0 mt-1 ms-2 d-flex-coloum justify-content-center">
            <h5 className="card-title text-danger m-0 ">
              <p
                className="text-danger p-0 m-0 "
                to={`/detail-product/${item.id}`}
              >
                {item.name}
              </p>
            </h5>
            <p className="card-text m-0 fw-light p-0 ">
              {convertRupiah.convert(item.price)}
            </p>
            <p className="card-text m-0 ">Stock: {item.qty}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
