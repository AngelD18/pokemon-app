import React from "react";
import { useTheme, Text, Spacer, Link } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: theme?.colors.gray300.value,
      }}
    >
      <Image
        src={
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        }
        alt="icono"
        width={70}
        height={70}
        style={{ marginBottom: 8 }}
      />

      <NextLink href={"/"} passHref legacyBehavior>
        <Link>
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okémon
          </Text>
        </Link>
      </NextLink>
      <Spacer
        css={{
          flex: 1,
        }}
      />
      <NextLink href={"/favorites"} passHref style={{ marginBottom: 27 }}>
        <Link></Link>
        <Text color="white">Favoritos</Text>
      </NextLink>
    </div>
  );
};
