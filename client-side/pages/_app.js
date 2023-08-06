import { createGlobalStyle } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet-async";

export default function App({ Component, pageProps }) {
  return (
    <HelmetProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </HelmetProvider>
  );
}

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
  
  body {
    padding: 0;
    margin: 0;
    font-family: 'Quicksand', sans-serif; 
  }
`;
