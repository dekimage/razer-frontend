import React from "react";
import App, { Container } from "next/app";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import withData from "../lib/withData";
import Layout from "../components/Layout";
import AppProvider from "../components/Context/AppProvider";

// const stripePromise = loadStripe("pk_test_WngI4M59WehN3wHtiBQtScEH002eADVPvj");

//Axios Default setup - maybe not best place to put it + not sure about token from cookie auth
axios.defaults.baseURL = "https://localhost:3000/";
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, isAuthenticated, ctx } = this.props;

    return (
      // <Elements stripe={stripePromise}>
        <Container>
          <AppProvider>
            <Layout isAuthenticated={isAuthenticated} {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </AppProvider>

          <style jsx global>
            {`
              * {
                margin: 0;
                padding: 0;
                border-sizing: border-box;
              }
              html {
              }
              body {
                font-family: "Work Sans", "Kanit", sans-serif !important;
                font-size: 16px;
                color: #3c464e;
              }

              // Padding || Margin
              .p1 {
                padding: 1rem;
              }
              .pl1 {
                padding-left: 1rem;
              }
              .pt1 {
                padding-top: 1rem;
              }
              .pr1 {
                padding-right: 1rem;
              }
              .pb1 {
                padding-bottom: 1rem;
              }
              .m1 {
                margin: 1rem;
              }
              .ml1 {
                margin-left: 1rem;
              }
              .mt1 {
                margin-top: 1rem;
              }
              .mr1 {
                margin-right: 1rem;
              }
              .mb1 {
                margin-bottom: 1rem;
              }

              .p5 {
                padding: 0.5rem;
              }
              .pl5 {
                padding-left: 0.5rem;
              }
              .pt5 {
                padding-top: 0.5rem;
              }
              .pr5 {
                padding-right: 0.5rem;
              }
              .pb5 {
                padding-bottom: 0.5rem;
              }
              .m5 {
                margin: 0.5rem;
              }
              .ml5 {
                margin-left: 0.5rem;
              }
              .mt5 {
                margin-top: 0.5rem;
              }
              .mr5 {
                margin-right: 0.5rem;
              }
              .mb5 {
                margin-bottom: 0.5rem;
              }
              // Flex
              .flex {
                display: flex;
              }
              .flex-grow {
                flex-grow: 1;
              }
              .flex-center {
                justify-content: center;
                align-items: center;
              }
              .align-center {
                align-items: center;
              }
              .justify-center {
                justify-content: center;
              }
              .flex-row {
                display: flex;
                flex-direction: row;
              }
              .flex-column {
                display: flex;
                flex-direction: column;
              }
              .justify-between {
                justify-content: space-between;
              }
              .justify-around {
                justify-content: space-around;
              }
            `}
          </style>
        </Container>
      // </Elements>
    );
  }
}

export default withData(MyApp);
