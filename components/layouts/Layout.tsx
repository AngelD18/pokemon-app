import { FC } from "react";
import Head from "next/head";
import React from "react";
import { Navbar } from "../ui";
interface Props {
  children: any;
  title?: string;
  img?: string;
}
const origin = typeof window === "undefined" ? "" : window.location.origin;
export const Layout: FC<Props> = ({ children, title, img }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Angel Puebla" />
        <link
          rel="icon"
          type="image/png"
          href="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
        />
        <meta
          name="description"
          content={`Información sobre el pokémon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta
          property="og:title"
          content={`Información sobre el pokémon ${title}`}
        />
        <meta
          property="og:description"
          content={`Esta es la página sobre  ${title}`}
        />
        <meta
          property="og:image"
          content={img ? `${origin}/img/${img}` : `${origin}/img/banner.png`}
        />
      </Head>
      <Navbar />
      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
