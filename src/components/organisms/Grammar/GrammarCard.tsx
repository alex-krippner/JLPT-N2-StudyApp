import React, { useState } from 'react';
import { Grid, Paper, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import CardMenu from '../../molecules/CardMenu';
import Rating from '../../atoms/Rating';
import Panel from '../../atoms/Panel';
import CardScene from '../../atoms/CardScene';
import AppBarHeader from '../../molecules/AppBarHeader';
import CardSide from '../../atoms/CardSide';
import Section from '../../atoms/Section';
import SubSection from '../../atoms/SubSection';
import { deleteGrammar } from '../../../state-management/redux/grammarCollection.reducer';
import { GrammarForm } from './Form/GrammarForm';

const useStyles = makeStyles({
  paper: {
    height: '100%',
    overflow: 'auto',
  },

  container_main: {
    height: '100%',
  },
});

const tabStyles = {
  fontSize: 'var(--font-size-small)',
  minWidth: 'auto',
  margin: '0 5px',
};

const appBarStyles = {
  boxShadow: 'none',
};

const GrammarCard = <T extends GrammarCardData, K extends TabLabel>({
  cardData,
  onRate,
  tabLabels,
}: CardProps<T, K>) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleDelete = () =>
    dispatch(deleteGrammar(cardData.mainContent));

  const CardFormComponent = (
    <GrammarForm
      label="文法"
      tabLabels={tabLabels}
      cardData={cardData}
      editing
    />
  );

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue?: number,
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
              <AppBarHeader
                tabLabels={['Grammar', 'Grammar Details']}
                appBarStyles={appBarStyles}
                tabStyles={tabStyles}
                value={value}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item container xs={3} justify="flex-end">
              <CardMenu
                cardId={cardData.id}
                CardFormComponent={CardFormComponent}
                handleDelete={handleDelete}
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
                  alignItems="center"
                  height="90%"
                  fontSize="var(--font-size-large)"
                >
                  {cardData.mainContent}{' '}
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="10%"
              >
                {[...Array(3)].map((cur, i) => (
                  <Rating
                    // eslint-disable-next-line react/no-array-index-key
                    key={cardData.id + i}
                    selected={i < cardData.rating}
                    onClick={
                      // the rating is passed as 'i + 1' (ie. to convert from array index: the index of the star plus 1 )
                      () => {
                        return onRate(cardData.mainContent, i + 1);
                      }
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
              {tabLabels.map((tabLabel: K, idx) => {
                // @ts-ignore
                const cardEntries = cardData[tabLabel] as Array<
                  string
                >;
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
                    <SubSection
                      flex="0 0 20%"
                      padding=" 5px"
                      fontSize="var(--font-size-small)"
                      color="var(--color-primary-light)"
                    >
                      {tabLabel}
                    </SubSection>
                    <SubSection
                      flex="0 0 80%"
                      justifyContent="center"
                      width="100%"
                      section={idx}
                      overflow="auto"
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
                          {cardEntries.length === 0 ? 'No data' : ''}
                          {cardEntries.map((el: K, i) => (
                            <Box
                              display="flex"
                              align-items="center"
                              key={el}
                            >
                              <>
                                <span>{i + 1}.&nbsp;</span>
                                <div>
                                  {/* @ts-ignore */}
                                  {el || 'No data'}
                                </div>
                              </>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </SubSection>
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

export default GrammarCard;
