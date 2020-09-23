import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

import AkitaOniImage from '../img/akita_oni.png';
import BeerImage from '../img/beer.png';
import BemusutaImage from '../img/bemusuta.png';
import BirdImage from '../img/bird.png';
import BuddhaRoundImage from '../img/buddha_round.png';
import ChawanImage from '../img/chawan.png';
import FujiImage from '../img/fuji.png';
import GeishaImage from '../img/geisha.png';
import JudoImage from '../img/judo.png';
import KabuImage from '../img/kabu.png';
import LanternLadyImage from '../img/lady_lantern.png';
import MatsuriImage from '../img/matsuri.png';
import TakoImage from '../img/tako.png';
import TanukiImage from '../img/tanuki.png';
import TenguImage from '../img/tengu.png';

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

const useStyles = makeStyles(() => ({
  iconChar: {
    fontSize: (props) => `${props.iconSize}`,
    position: 'absolute',
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

const FlyingCharBackground = (props) => {
  const classes = useStyles(props);

  return (
    <FlyingCharBgStyled>
      {imgArray.map((img) => (
        <Image
          key={img}
          // create random starting position
          initial={{
            top: '-20%',
            left: `${Math.floor(Math.random() * 100)}%`,
          }}
          animate={{
            y: `calc(120vh + (${Math.floor(Math.random() * 1000)}%))`,
            rotate: 360,
          }}
          transition={{
            ease: 'easeOut',
            duration: 30,
            repeat: Infinity,
            repeatType: 'infinity',
            delay: `${Math.floor(Math.random() * 10)}`,
          }}
        >
          <Icon className={classes.iconChar}>
            <img
              style={{
                height: '100%',
                width: '100%',
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

export default FlyingCharBackground;
