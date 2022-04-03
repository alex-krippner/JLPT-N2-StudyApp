import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

import AkitaOniImage from "@mon-assets/img/akita_oni.png";
import BeerImage from "@mon-assets/img/beer.png";
import BemusutaImage from "@mon-assets/img/bemusuta.png";
import BirdImage from "@mon-assets/img/bird.png";
import BuddhaRoundImage from "@mon-assets/img/buddha_round.png";
import ChawanImage from "@mon-assets/img/chawan.png";
import FujiImage from "@mon-assets/img/fuji.png";
import GeishaImage from "@mon-assets/img/geisha.png";
import JudoImage from "@mon-assets/img/judo.png";
import KabuImage from "@mon-assets/img/kabu.png";
import LanternLadyImage from "@mon-assets/img/lady_lantern.png";
import MatsuriImage from "@mon-assets/img/matsuri.png";
import TakoImage from "@mon-assets/img/tako.png";
import TanukiImage from "@mon-assets/img/tanuki.png";
import TenguImage from "@mon-assets/img/tengu.png";

const FlyingCharBgStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Image = styled(motion.div)`
  display: flex;
  position: absolute;
  overflow: visible;
`;

type FlyingCharBackgroundProps = {
  iconSize: string;
};

const useStyles = makeStyles(() => ({
  iconChar: {
    fontSize: (props: FlyingCharBackgroundProps) => `${props.iconSize}`,
    position: "absolute",
  },
}));

const imgArray = [
  AkitaOniImage,
  BeerImage,
  BemusutaImage,
  BirdImage,
  BuddhaRoundImage,
  ChawanImage,
  FujiImage,
  GeishaImage,
  JudoImage,
  KabuImage,
  LanternLadyImage,
  MatsuriImage,
  TakoImage,
  TanukiImage,
  TenguImage,
];

export const BackgroundAnimation = (props: FlyingCharBackgroundProps) => {
  const classes = useStyles(props);

  return (
    <FlyingCharBgStyled>
      {imgArray.map((img) => (
        <Image
          key={img}
          // create random starting position
          initial={{
            top: "-20%",
            left: `${Math.floor(Math.random() * 100)}%`,
          }}
          animate={{
            y: `calc(120vh + (${Math.floor(Math.random() * 1000)}%))`,
            rotate: 360,
          }}
          transition={{
            ease: "easeOut",
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.floor(Math.random() * 10),
          }}
        >
          <Icon className={classes.iconChar}>
            <img
              style={{
                height: "100%",
                width: "100%",
              }}
              src={img}
              alt={img}
            />
          </Icon>
        </Image>
      ))}
    </FlyingCharBgStyled>
  );
};
