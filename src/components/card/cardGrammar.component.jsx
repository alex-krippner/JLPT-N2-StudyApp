/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import { AppBar, Grid, Tab, Tabs, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import CardMenu from './cardMenu.component';
import Rating from '../rating.component';

const CardScene = styled.div`
  height: 90%;
  width: 85rem;
`;

const CardSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.8s ease, background 0.8s ease;
  background-color: var(--color-white);
  font-size: var(--font-size-medium);
  color: var(--color-primary-dark);
 

  .top {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 5px;
    font-size: var(--font-size-small);
  }



    .sentenceWrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      height: 100%;
      margin: 0;
      padding: 1rem;
      font-size: var(--font-size-small);
    }

    .paragraph {
      display: flex;
      align-items: center;
      margin: 0;
    }
  }

  .dot {
    display: inline-block;
    height: 1rem;
    width: 1rem;
    margin-right: 1rem;
    border-radius: 50%;
    border: solid 1px #708090;
    background-color: var(--color-white);
  }
`;

const Front = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .menu-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const FrontData = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  font-size: var(--font-size-large);
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
`;

const BackSection = styled.section.attrs((props) => ({
  borderBottom: () => {
    if (props.section < props.labelNum - 1) return 'solid 1px';
  },
}))`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  font-size: var(--font-size-medium);
  border-bottom: ${(props) => props.borderBottom};
  height: ${(props) => (props.section === 1 ? '20%' : '40%')};
  overflow: auto;
`;

const Top = styled.div`
  flex: 0 0 20%;
  padding: 5px;
  font-size: var(--font-size-small);
  text-transform: capitalize;
`;

const Bottom = styled.div`
  flex: 0 0 80%
  justify-content: center;
  width: 100%;
  
  margin: 0;

 


`;

const useStyles = makeStyles({
  root: {
    '&.MuiPaper-elevation4': {
      boxShadow: 'none',
    },
  },

  tab: {
    fontSize: 'var(--font-size-small)',
    minWidth: 'auto',
    margin: '0 5px',
  },
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

const TabPanel = (props) => {
  const { value, index, children } = props;
  const classes = useStyles();

  return (
    <div hidden={value !== index} className={classes.grid}>
      {value === index && (
        <div className={classes.grid}>{children}</div>
      )}
    </div>
  );
};

const CardGrammar = ({
  cardData,
  onRate,
  tabLabels,
  cardFormData,
  formDispatcher,
  label,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CardScene cardType={cardData.cardType}>
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
              <AppBar
                position="static"
                color="transparent"
                className={classes.root}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="full width tabs"
                  variant="fullWidth"
                >
                  <Tab className={classes.tab} label="Front" />
                  <Tab className={classes.tab} label="Back" />
                </Tabs>
              </AppBar>
            </Grid>
            <Grid item container xs={3} justify="flex-end">
              <CardMenu
                front={cardData[label]}
                cardId={cardData.id}
                cardFormData={cardFormData}
                formDispatcher={formDispatcher}
                label={label}
                tabLabels={tabLabels}
                cardData={cardData}
                className={classes.cardMenu}
              />
            </Grid>
          </Grid>
          <TabPanel value={value} index={0}>
            <CardSide
              front
              cardType={cardData.cardType}
              className="card-side"
            >
              <Front>
                <FrontData>{cardData[label]} </FrontData>
              </Front>
              <RatingContainer>
                {[...Array(3)].map((cur, i) => (
                  <Rating
                    key={uuidv4()}
                    selected={i < cardData.rating}
                    onClick={
                      // the rating is passed as 'i + 1' (ie. to convert from array index: the index of the star plus 1 )
                      () => onRate(cardData.id, i + 1)
                    }
                  />
                ))}
              </RatingContainer>
            </CardSide>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CardSide
              back
              className="card-side"
              hidden={value !== 1}
              value={value}
            >
              {tabLabels.map((tabLabel, idx) => {
                return (
                  <BackSection
                    key={tabLabel}
                    section={idx}
                    labelNum={tabLabels.length}
                  >
                    <div style={{ minHeight: 0 }}>
                      <Top>{tabLabel}</Top>
                      <Bottom className="bottom" section={idx}>
                        <div className="sentenceWrapper">
                          {cardData[tabLabel].map((el, i) => (
                            <div className="paragraph" key={el}>
                              {cardData[tabLabel].length === 0 ||
                              cardData[tabLabel][0] === '' ? (
                                <div>
                                  Looks like there is no data for this
                                  section...
                                </div>
                              ) : (
                                <>
                                  <span>{i + 1}.&nbsp;</span>
                                  <div>{el}</div>{' '}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </Bottom>
                    </div>
                  </BackSection>
                );
              })}
            </CardSide>
          </TabPanel>
        </Grid>
      </Paper>
    </CardScene>
  );
};

export default CardGrammar;
