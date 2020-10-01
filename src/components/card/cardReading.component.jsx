/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import { AppBar, Grid, Tab, Tabs, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import CardMenu from './cardMenu.component';
import Rating from '../rating.component';

import { capitalizeFirstWord } from '../../utils/utilitiesFunctions';

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
  text-align: center;
  height: 90%;
  width: 75%;
  display: flex;
  line-height: 2;
  font-size: var(--font-size-small);
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
`;

const Top = styled.div`
  flex: 0 0 20%;
  padding: 5px;
  font-size: var(--font-size-small);
  color: var(--color-primary-light);
`;

const Bottom = styled.div`
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

const Passage = styled.div`
  height: 90%;
  width: 100%;
  padding: 1rem;
  overflow: auto;
`;

const FrontContent = ({ cardData }) => {
  if (cardData.cardType === 'reading')
    return <Passage>{cardData.passage}</Passage>;
};

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

const CardReading = ({
  cardData,
  onRate,
  tabLabels,
  cardFormData,
  formDispatcher,
  label,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [visible, setVisibility] = useState(false);
  const [blur, setBlur] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleVisibility = (e, index, arrayLength) => {
    if (index !== arrayLength - 1) return;

    setVisibility(!visible);
    setBlur(!blur);
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
                  <Tab className={classes.tab} label="Passage" />
                  <Tab className={classes.tab} label="Q &amp; A" />
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
                <FrontData>
                  <FrontContent cardData={cardData} />
                </FrontData>
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
                if (tabLabel === 'passage') return;

                return (
                  <BackSection
                    key={tabLabel}
                    section={idx}
                    labelNum={tabLabels.length}
                  >
                    {/* set minHeight to 0 to prevent cutoff when the BackSection overflow is set to auto */}

                    <Top>
                      {tabLabel === 'choices'
                        ? capitalizeFirstWord(
                            'choose the most suitable',
                          )
                        : capitalizeFirstWord(tabLabel)}
                    </Top>

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
                      <div style={{ minHeight: 0 }}>
                        <div className="sentenceWrapper">
                          {cardData[tabLabel].map((el, i) => (
                            <div className="paragraph" key={el}>
                              {idx === 0 ? (
                                ''
                              ) : (
                                <span>{i + 1}.&nbsp;</span>
                              )}
                              <div>{el}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Bottom>
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

export default CardReading;
