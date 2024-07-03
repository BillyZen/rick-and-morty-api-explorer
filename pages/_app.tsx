import { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../utils/apollo";

import Wrapper from "../pages/components/Wrapper";

import trpc from "@/utils/trpc";

import Head from "next/head";

import "./globals.css";

import { useEffect } from "react";

const RickAndMortyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  useEffect(() => {
    const handleScreenResize = () => {
      let event: CustomEvent;
      if (window.innerWidth < 768) {
        event = new CustomEvent("mobile");
      } else {
        event = new CustomEvent("desktop");
      }

      window.dispatchEvent(event);
    };
    handleScreenResize();

    window.addEventListener("resize", handleScreenResize);
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  return (
    <UserProvider>
      <Head>
        <title>Rick and Morty Api Explorer</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ApolloProvider>
    </UserProvider>
  );
};

export default trpc.withTRPC(RickAndMortyApp);
