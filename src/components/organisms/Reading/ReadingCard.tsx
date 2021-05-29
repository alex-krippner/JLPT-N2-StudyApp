import React, { useState } from 'react';

import { Grid, Paper, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import styled from 'styled-components';
import CardMenu from '../../molecules/CardMenu';
import Rating from '../../atoms/Rating';
import Panel from '../../atoms/Panel';

import { capitalizeFirstWord } from '../../../utils/utilitiesFunctions';
import CardScene from '../../atoms/CardScene';
import AppBarHeader from '../../molecules/AppBarHeader';
import CardSide from '../../atoms/CardSide';
import Section from '../../atoms/Section';
import SubSection from '../../atoms/SubSection';

const Bottom = styled.div<StyledProps>`
  flex: 0 0 80%
  justify-content: center;
  width: 100%;  
  margin: 0;
  filter: ${(props) =>
    props.blur === false && props.tabLabel === 'solution'
      ? 'blur(3px)'
      : 'none'};
  cursor: ${(props) =>
    props.tabLabel === 'solution' ? 'pointer' : ''};
    overflow: auto;


  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: ${(props) =>
      props.visible === false && props.tabLabel === 'solution'
        ? 'rgba(63, 81, 181, 0.8)'
        : 'transparent'};
  }
`;

const useStyles = makeStyles({
  paper: {
    height: '100%',
    overflow: 'auto',
  },

  grid: {
    height: '100%',
  },

  container_main: {
    height: '100%',
  },
});

const appBarStyles = {
  boxShadow: 'none',
};

const tabStyles = {
  fontSize: 'var(--font-size-small)',
  minWidth: 'auto',
  margin: '0 5px',
};
const ReadingCard = <T extends ReadingCardData, K extends TabLabel>({
  cardData,
  onRate,
  tabLabels,
  label,
}: CardProps<T, K>) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [visible, setVisibility] = useState(false);
  const [blur, setBlur] = useState(false);

  const handleChange = (
    event: React.MouseEvent,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  const handleVisibility = (
    event: React.MouseEvent,
    index: number,
    arrayLength: number,
  ) => {
    if (index !== arrayLength - 1) return;

    setVisibility(!visible);
    setBlur(!blur);
  };

  return (
    <CardScene>
      <Paper
        square={false}
        className={classes.paper}
        id={cardData.id}
        elevation={3}
      >
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          wrap="nowrap"
          className={classes.container_main}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            wrap="nowrap"
          >
            <Grid item container xs={9} justify="flex-start">
              <AppBarHeader
                tabLabels={['Passage', 'Q & A']}
                appBarStyles={appBarStyles}
                tabStyles={tabStyles}
                value={value}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item container xs={3} justify="flex-end">
              <CardMenu
                cardId={cardData.id}
                label={label}
                tabLabels={tabLabels}
                cardData={cardData}
              />
            </Grid>
          </Grid>
          <Panel value={value} index={0}>
            <CardSide
              position="inherit"
              border="0"
              boxShadow="none"
              transition="transform 0.8s ease, background 0.8s ease"
              bgColor="var(--color-white)"
              fontSize="var(--font-size-medium)"
              color="var(--color-primary-dark)"
            >
              <Box
                position="relative"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height=" 100%"
              >
                <Box
                  display="flex"
                  height="90%"
                  width="75%"
                  lineHeight="2"
                  textAlign="center"
                  fontSize="var(--font-size-small)"
                >
                  <Box
                    height="90%"
                    width="100%"
                    padding="1rem"
                    overflow="auto"
                  >
                    {cardData.passage}
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="10%"
              >
                {' '}
                {[...Array(3)].map((cur, i) => (
                  <Rating
                    // eslint-disable-next-line react/no-array-index-key
                    key={cardData.id + i}
                    selected={i < cardData.rating}
                    onClick={
                      // the rating is passed as 'i + 1' (ie. to convert from array index: the index of the star plus 1 )
                      () => onRate(cardData.id, i + 1)
                    }
                  />
                ))}
              </Box>
            </CardSide>
          </Panel>
          <Panel value={value} index={1}>
            <CardSide
              position="inherit"
              border="0"
              boxShadow="none"
              transition="transform 0.8s ease, background 0.8s ease"
              bgColor="var(--color-white)"
              fontSize="var(--font-size-medium)"
              color="var(--color-primary-dark)"
            >
              {tabLabels.map((tabLabel: K, idx: number) => {
                // @ts-ignore
                const cardEntries = cardData[tabLabel] as Array<
                  string
                >;
                if (tabLabel === 'passage') {
                  return '';
                }
                return (
                  <Section
                    key={tabLabel}
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    fontSize="var(--font-size-medium)"
                    borderBottom={
                      idx < tabLabels.length - 1 ? 'solid 1px' : ''
                    }
                    height={idx === 1 ? '20%' : '40%'}
                  >
                    {/* set minHeight to 0 to prevent cutoff when the BackSection overflow is set to auto */}

                    <SubSection
                      flex="0 0 20%"
                      padding=" 5px"
                      fontSize="var(--font-size-small)"
                      color="var(--color-primary-light)"
                    >
                      {' '}
                      {tabLabel === 'choices'
                        ? capitalizeFirstWord(
                            'choose the most suitable',
                          )
                        : capitalizeFirstWord(tabLabel)}
                    </SubSection>

                    <Bottom
                      className="bottom"
                      visible={visible}
                      blur={blur}
                      section={idx}
                      tabLabel={tabLabel}
                      onClick={(e) =>
                        handleVisibility(e, idx, tabLabels.length)
                      }
                    >
                      <Box minHeight="0">
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-around"
                          alignItems="flex-start"
                          height="100%"
                          padding="1rem"
                          fontSize="var(--font-size-small)"
                        >
                          {cardEntries.map((el: string, i) => (
                            <Box
                              display="flex"
                              align-items="center"
                              key={el}
                            >
                              {idx === 0 ? (
                                ''
                              ) : (
                                <span>{i + 1}.&nbsp;</span>
                              )}
                              <div>{el}</div>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Bottom>
                  </Section>
                );
              })}
            </CardSide>
          </Panel>
        </Grid>
      </Paper>
    </CardScene>
  );
};

export default ReadingCard;
