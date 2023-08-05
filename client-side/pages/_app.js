import { createGlobalStyle } from "styled-components";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
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
