import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Button from "@/components/PrimaryButton";
import Table from "@/components/Table";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

function CartPage() {
  // Grab cart context
  const { cartProducts, addProducts } = useContext(CartContext);

  // State to hold details of products beyond their ids
  const [products, setProducts] = useState([]);

  // Hook to retrieve the data of all the products in the cart using their ids
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  // If a user wants more of the same product,
  function addDuplicate(id) {
    addProducts(id);
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
                        <Button>-</Button>
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
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <input type="text" placeholder="Address"></input>
              <input type="text" placeholder="Address 2"></input>
              <Button $black $block>
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
