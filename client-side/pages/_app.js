import { createGlobalStyle } from "styled-components";
import { Quicksand } from "next/font/google";
import CartContextProvider from "@/components/CartContext";

const quicksand = Quicksand({
  weight: "500",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={quicksand.className}>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </main>
  );
}

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Quicksand', sans-serif; 
  }
`;
