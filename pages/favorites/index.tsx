import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layouts";
import { NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";
import { PokemonFavorites } from "@/components/pokemonFavorites";

const FavoritesPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);
  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons);
  }, []);

  return (
    <Layout title="Pokémons - Favoritos">
      {favoritePokemons.length > 0 ? (
        <PokemonFavorites pokemons={favoritePokemons} />
      ) : (
        <NoFavorites />
      )}
    </Layout>
  );
};
export default FavoritesPage;
