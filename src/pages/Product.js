import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../components/Navbar";
import ProductCard from "../components/card/ProductCard";
import imgEmpty from "../assets/empty.svg";

// Import useQuery
import { useQuery } from "react-query";

// API config
import { API } from "../config/api";

export default function Product() {
  let api = API();
  const [datas, setDatas] = useState([]);
  // Fetching product data from database
  let { data: products, refetch } = useQuery("productsCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/products", config);
    let fetchfilter = response.data;
    return setDatas(fetchfilter);
    // return response.data;
  });

  //search fitur
  const [search, setSearch] = useState("");
  let filterProduct = datas.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        <Row>
          <Col>
            <div className="text-header-product">Product</div>
          </Col>
        </Row>
        <div className="container-fluid">
          <input
            className="fs-5 p-2 text-dark fw-bold rounded w-50  "
            type="text"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Row className="my-4">
          {products?.length != 0 ? (
            <div className="cards-product row p-0 m-0 justify-content-end ">
              {filterProduct?.map((item, index) => (
                <ProductCard item={item} index={index} key={item.id} />
              ))}
            </div>
          ) : (
            <Col>
              <div className="text-center pt-5">
                <img
                  src={imgEmpty}
                  className="img-fluid"
                  style={{ width: "40%" }}
                />
                <div className="mt-3">No data product</div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
