import React, { useState } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Pokemon, PokemonListResponse } from "@/interfaces";
import { pokeApi } from "@/api";
import { getPokemonInfo, localFavorites } from "@/utils";
import confetti from "canvas-confetti";
import { LayoutPokemon } from "@/components/layoutPokemon";
interface Props {
  pokemon: Pokemon;
}
const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);
  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);
  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),

    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};
export default PokemonByNamePage;
