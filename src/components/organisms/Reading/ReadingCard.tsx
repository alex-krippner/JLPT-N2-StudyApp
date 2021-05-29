import React, { useState } from 'react';

import { AppBar, Grid, Tab, Tabs, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import CardMenu from '../../molecules/CardMenu';
import Rating from '../../atoms/Rating';
import Panel from '../../atoms/Panel';
import { cardReadingGramStyles } from '../../../theme/styledComponents';

import { capitalizeFirstWord } from '../../../utils/utilitiesFunctions';
import CardScene from '../../atoms/CardScene';
import AppBarHeader from '../../molecules/AppBarHeader';

const {
  CardSideLarge,
  Front,
  FrontData,
  RatingContainer,
  BackSection,
  Top,
  Bottom,
  Passage,
} = cardReadingGramStyles;

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
                // front={cardData[label]}
                cardId={cardData.id}
                label={label}
                tabLabels={tabLabels}
                cardData={cardData}
              />
            </Grid>
          </Grid>
          <Panel value={value} index={0}>
            <CardSideLarge>
              <Front>
                <FrontData>
                  <Passage>{cardData.passage}</Passage>
                </FrontData>
              </Front>
              <RatingContainer>
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
              </RatingContainer>
            </CardSideLarge>
          </Panel>
          <Panel value={value} index={1}>
            <CardSideLarge>
              {tabLabels.map((tabLabel: K, idx: number) => {
                // @ts-ignore
                const cardEntries = cardData[tabLabel] as Array<
                  string
                >;
                if (tabLabel === 'passage') {
                  return '';
                }
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
                          {cardEntries.map((el: string, i) => (
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
            </CardSideLarge>
          </Panel>
        </Grid>
      </Paper>
    </CardScene>
  );
};

export default ReadingCard;
