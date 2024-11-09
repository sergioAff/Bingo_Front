import "../styles/globals.css";
import ReduxProvider from "../components/ReduxProvider";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <Header />
      <Component {...pageProps} /> <Footer />
    </ReduxProvider>
  );
}

export default MyApp;
