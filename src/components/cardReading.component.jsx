/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import { AppBar, Tab, Tabs, Paper } from '@material-ui/core/';

import { makeStyles } from '@material-ui/core/styles';

import CardMenu from './cardMenu.component';
import Star from './star.component';

const CardScene = styled.div`
  height: 55rem;
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
  color: var(--color-grey-medium);

 

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
      justify-content: center;
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

const Rating = styled.div`
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
  justify-content: flex-end;
  align-items: flex-start;
  font-size: var(--font-size-medium);
  border-bottom: ${(props) => props.borderBottom};
  height: ${(props) => (props.section === 1 ? '15%' : '45%')};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 75%;
  margin: 0;
  filter: ${(props) =>
    props.blur === false && props.tabLabel === 'solution'
      ? 'blur(3px)'
      : 'none'};
  cursor: ${(props) =>
    props.tabLabel === 'solution' ? 'pointer' : ''};

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
  overflow: auto;
`;

const FrontContent = ({ cardData }) => {
  if (cardData.cardType === 'reading')
    return <Passage>{cardData.passage}</Passage>;
};

const useStyles = makeStyles({
  AppBarRoot: {
    position: 'static',
    display: 'flex',
    boxShadow: 'none',
    width: '50%',
    background: 'transparent',
    left: 0,
    color: 'var(--color-blue-dark)',
  },

  tab: {
    fontSize: 'var(--font-size-small)',
  },
  paper: {
    height: '100%',
  },

  grid: {
    height: '100%',
  },

  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function capitalizeFirstWord(string) {
    return string
      .split(' ')
      .map((word, idx) =>
        idx === 0 ? capitalizeFirstLetter(word) : word,
      )
      .join(' ');
  }

  return (
    <CardScene cardType={cardData.cardType}>
      <Paper
        square={false}
        className={classes.paper}
        height="100%"
        id={cardData.id}
        elevation={3}
      >
        <div className={classes.container}>
          <AppBar classes={{ root: classes.AppBarRoot }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              centered
            >
              <Tab className={classes.tab} label="Passage" />
              <Tab className={classes.tab} label="Q &amp; A" />
            </Tabs>
          </AppBar>
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
              <Rating>
                {[...Array(3)].map((cur, i) => (
                  <Star
                    key={uuidv4()}
                    selected={i < cardData.rating}
                    onClick={
                      // the rating is passed as 'i + 1' (ie. to convert from array index: the index of the star plus 1 )
                      () => onRate(cardData.id, i + 1)
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                  />
                ))}
              </Rating>
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
                    <div className="top">
                      {tabLabel === 'choices'
                        ? capitalizeFirstWord(
                            'choose the most suitable',
                          )
                        : capitalizeFirstWord(tabLabel)}
                    </div>
                    <Bottom
                      className="bottom"
                      visible={visible}
                      blur={blur}
                      section={idx}
                      tabLabel={tabLabel}
                      onClick={
                        (e) =>
                          handleVisibility(e, idx, tabLabels.length)
                        // eslint-disable-next-line react/jsx-curly-newline
                      }
                    >
                      <div className="sentenceWrapper">
                        {cardData[tabLabel].map((el, i) => (
                          <div className="paragraph" key={uuidv4()}>
                            {idx === 0 ? (
                              ''
                            ) : (
                              <span>{i + 1}.&nbsp;</span>
                            )}
                            <div>{el}</div>
                          </div>
                        ))}
                      </div>
                    </Bottom>
                  </BackSection>
                );
              })}
            </CardSide>
          </TabPanel>
        </div>
      </Paper>
    </CardScene>
  );
};

export default CardReading;
