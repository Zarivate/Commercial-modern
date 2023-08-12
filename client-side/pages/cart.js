import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Button from "@/components/PrimaryButton";
import Table from "@/components/Table";
import Input from "@/components/Input";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

function CartPage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  const [success, setSuccess] = useState(false);

  // Grab cart context
  const { cartProducts, addProducts, removeProducts, clearCart } =
    useContext(CartContext);

  // State to hold details of products beyond their ids
  const [products, setProducts] = useState([]);

  // Hook to retrieve the data of all the products in the cart using their ids
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
      // If there are no products, set the data to be just that, an empty array
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  // Hook to make sure user products are removed from their cart after successful transaction
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.location.href.includes("success")) {
      setSuccess(true);
      clearCart();
    }
  }, []);

  // If a user wants more of the same product,
  function addDuplicate(id) {
    addProducts(id);
  }

  function removeProduct(id) {
    removeProducts(id);
  }

  async function makePayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    // If there is a redirect url within the response, navigate to it
    if (response.data.url) {
      // Because it's outside of the React app it has to be done like this
      window.location = response.data.url;
    }
  }

  // Check to see if the order was successfully places using the url, if so return a simple success page
  if (success) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thank you for your order!</h1>
              <p>Details have been sent to your email.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  let total = 0;

  for (const productID of cartProducts) {
    const price =
      products.find((product) => product._id === productID)?.price || 0;
    total += price;
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {/* If there are no products in the cart, then display a message, else display the products and order info side panel */}
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>

                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => removeProduct(product._id)}>
                          -
                        </Button>
                        <QuantitySpace>
                          {/* In order to get the quantity of an item, the id for the product is filtered through the cartProducts for any matching ones */}
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantitySpace>
                        <Button onClick={() => addDuplicate(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <CityBox>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </CityBox>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(e) => setCountry(e.target.value)}
              />
              {/* So that the cart details are passed through in the form as well, a hidden input field is used. The data is just
                an array of ids so it's passed through while being joined with commas. This is unused after changing to using Axios.
                Where data is split up in the backend api route instead.*/}
              {/* <input
                  type="hidden"
                  name="products"
                  value={cartProducts.join(",")}
                /> */}
              <Button $black $block onClick={makePayment}>
                Continue to Payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}

export default CartPage;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

// const OrderBox = styled.div`
//   background-color: #fff;
//   border-radius: 10px;
//   padding: 30px;
//   height: 380px;
// `;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantitySpace = styled.span`
  padding: 0 3px;
`;

const CityBox = styled.div`
  display: flex;
  gap: 5px;
`;
