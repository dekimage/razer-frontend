import React from "react";
import Head from "next/head";
import Link from "next/link";

import { withRouter } from "next/router";
import { compose } from "recompose";

import { unsetToken } from "../lib/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultPage from "../hocs/defaultPage";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ req }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, isAuthenticated };
  }
  render() {
    const { isAuthenticated, children } = this.props;
    const title = "Guardians Of Wisdom";
    return (
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          paddingBottom: "10rem",
        }}
      >
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          {process.env.NODE_ENV !== "production" && (
            <link
              rel="stylesheet"
              type="text/css"
              href={"/_next/static/css/styles.chunk.css?v=" + Date.now()}
            />
          )}
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Kanit&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Work+Sans:400,500,700&display=swap"
            rel="stylesheet"
          ></link>
          {/* <script src="https://js.stripe.com/v3" /> */}

          <script
            type="module"
            src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js"
          ></script>

          <script
            nomodule=""
            src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.js"
          ></script>
        </Head>

        <Header
          isAuthenticated={isAuthenticated}
          unsetToken={unsetToken}
          userName={this.props.loggedUser}
          route={this.props.router.route}
        />

        {/* <ToastContainer
          className="toast-container"
          toastClassName="dark-toast"
          progressClassName={css({
            height: "2px"
          })}
        /> */}

        <ToastContainer
          position={toast.POSITION.BOTTOM_LEFT}
          hideProgressBar={true}
          autoClose={5000}
          className="toast-container"
        />

        {children}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default compose(defaultPage, withRouter)(Layout);
