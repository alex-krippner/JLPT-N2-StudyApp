import React, { useState } from 'react';

import { AppBar, Grid, Tab, Tabs, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import CardMenu from './CardMenu';
import Rating from '../Rating';
import GramReadTabpanel from './GramReadTabPanel';
import { cardReadingGramStyles } from '../../theme/styledComponents';

const {
  CardScene,
  CardSideLarge,
  Front,
  FrontData,
  RatingContainer,
  BackSection,
  Top,
  Bottom,
} = cardReadingGramStyles;

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

  container_main: {
    height: '100%',
  },
});

const CardGrammar = <
  T extends GrammarCardData,
  K extends keyof GrammarCardData
>({
  cardData,
  onRate,
  tabLabels,
  label,
}: CardProps<T, K>) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (
    event: React.MouseEvent,
    newValue: number,
  ) => {
    setValue(newValue);
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
                  <Tab className={classes.tab} label="Grammar" />
                  <Tab
                    className={classes.tab}
                    label="Grammar Details"
                  />
                </Tabs>
              </AppBar>
            </Grid>
            <Grid item container xs={3} justify="flex-end">
              <CardMenu
                front={cardData[label]}
                cardId={cardData.id}
                label={label}
                tabLabels={tabLabels}
                cardData={cardData}
              />
            </Grid>
          </Grid>
          <GramReadTabpanel value={value} index={0}>
            <CardSideLarge className="card-side">
              <Front>
                <FrontData grammar>{cardData[label]} </FrontData>
              </Front>
              <RatingContainer>
                {[...Array(3)].map((cur, i) => (
                  <Rating
                    // eslint-disable-next-line react/no-array-index-key
                    key={cardData.id + i}
                    selected={i < cardData.rating}
                    onClick={
                      // the rating is passed as 'i + 1' (ie. to convert from array index: the index of the star plus 1 )
                      () => {
                        return onRate(cardData[label], i + 1);
                      }
                    }
                  />
                ))}
              </RatingContainer>
            </CardSideLarge>
          </GramReadTabpanel>
          <GramReadTabpanel value={value} index={1}>
            <CardSideLarge>
              {tabLabels.map((tabLabel: K, idx) => {
                const cardEntries = cardData[tabLabel] as Array<
                  string
                >;
                return (
                  <BackSection
                    key={tabLabel}
                    section={idx}
                    labelNum={tabLabels.length}
                  >
                    <Top>{tabLabel}</Top>
                    <Bottom className="bottom" section={idx}>
                      <div style={{ minHeight: 0 }}>
                        <div className="sentenceWrapper">
                          {cardEntries.map((el: K, i) => (
                            <div className="paragraph" key={el}>
                              {[cardData[tabLabel]].length === 0 ||
                              [cardData[tabLabel]][0] === '' ? (
                                <div>
                                  Looks like there is no data for this
                                  section...
                                </div>
                              ) : (
                                <>
                                  <span>{i + 1}.&nbsp;</span>
                                  <div>{el}</div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Bottom>
                  </BackSection>
                );
              })}
            </CardSideLarge>
          </GramReadTabpanel>
        </Grid>
      </Paper>
    </CardScene>
  );
};

export default CardGrammar;
