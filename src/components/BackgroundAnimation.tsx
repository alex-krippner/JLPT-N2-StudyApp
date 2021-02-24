import * as React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

import AkitaOniImage from '../../assets/img/akita_oni.png';
import BeerImage from '../../assets/img/beer.png';
import BemusutaImage from '../../assets/img/bemusuta.png';
import BirdImage from '../../assets/img/bird.png';
import BuddhaRoundImage from '../../assets/img/buddha_round.png';
import ChawanImage from '../../assets/img/chawan.png';
import FujiImage from '../../assets/img/fuji.png';
import GeishaImage from '../../assets/img/geisha.png';
import JudoImage from '../../assets/img/judo.png';
import KabuImage from '../../assets/img/kabu.png';
import LanternLadyImage from '../../assets/img/lady_lantern.png';
import MatsuriImage from '../../assets/img/matsuri.png';
import TakoImage from '../../assets/img/tako.png';
import TanukiImage from '../../assets/img/tanuki.png';
import TenguImage from '../../assets/img/tengu.png';

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
    fontSize: (props: FlyingCharBackgroundProps) =>
      `${props.iconSize}`,
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

const FlyingCharBackground = (props: FlyingCharBackgroundProps) => {
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
            repeatType: 'loop',
            delay: Math.floor(Math.random() * 10),
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
