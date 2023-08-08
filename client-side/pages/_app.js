import { createGlobalStyle } from "styled-components";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={quicksand.className}>
      <GlobalStyles />
      <Component {...pageProps} />
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
