import React, { useState } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Pokemon } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";
import confetti from "canvas-confetti";
import { LayoutPokemon } from "@/components/layoutPokemon";
interface Props {
  pokemon: Pokemon;
}
const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existFavorites(pokemon.id)
  );
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);
    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <LayoutPokemon
      pokemon={pokemon}
      onToggleFavorite={onToggleFavorite}
      isInFavorites={isInFavorites}
    />
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map( ( value, index ) => `${ index + 1 }` );

  return {
    paths: pokemons151.map( id => ({
      params: { id }
    })),
    // fallback: false
    fallback: 'blocking'
  }
}



export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo( id );

  if ( !pokemon ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }


  return {
    props: {
      pokemon
    },
    revalidate: 86400, // 60 * 60 * 24,
  }
}





export default PokemonPage;

