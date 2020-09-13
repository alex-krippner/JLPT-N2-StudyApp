/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
import React from 'react';
// import styled from 'styled-components';
// import SvgIcon from '@material-ui/core/SvgIcon';

import DarumaIcon from '../img/darumaIcon';

// import daruma from '../img/daruma.svg';
// import { ReactComponent as DarumaIcon } from '../img/darumaIcon.svg';

// const Daruma = styled.div`
//   background-image: url(${daruma});
//   height: 10rem;
//   width: 10rem;
//   background-position: center;
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: contain;
// `;

// const useStyles = makeStyles({
//   mySvgStyle: {
//     fillColor: 'pink',
//   },
// });

// function Daruma() {
//   const classes = useStyles();

//   return (
//     <SvgIcon
//       component={DarumaIcon}
//       viewBox="0 0 210 297"
//       className={classes.mySvgStyle}
//     />
//   );
// }

const Home = () => {
  return (
    <>
      <h1>home</h1>
      <DarumaIcon
        fontSize="5rem"
        colorBodyLight="#add8e6"
        colorBodyDark="#4169E1"
        colorBodyDarkTwo="#3f51b5"
      />
    </>
  );
};

export default Home;
