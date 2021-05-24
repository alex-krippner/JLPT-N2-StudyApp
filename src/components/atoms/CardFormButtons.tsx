import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  submitButton: {
    height: '75%',
    textTransform: 'capitalize',
    backgroundColor: 'var(--color-primary-dark)',
    fontSize: 'var(--font-size-small)',

    '&:hover': {
      backgroundColor: 'var(--color-primary-medium)',
    },
  },

  buttonLabel: {
    textTransform: 'capitalize',
    fontSize: 'var(--font-size-small)',
  },
});

type CardFormButtonsProps = {
  editing: boolean;
  handleCreateCard: (event: React.MouseEvent) => void;
  handleEditCard: (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
};

const CardFormButtons = ({
  editing,
  handleCreateCard,
  handleEditCard,
}: CardFormButtonsProps) => {
  const classes = useStyles();
  return (
    <>
      {editing ? (
        <Button
          variant="contained"
          color="primary"
          size="large"
          classes={{
            label: classes.buttonLabel,
            root: classes.submitButton,
          }}
          onClick={(
            event:
              | React.MouseEvent<HTMLAnchorElement>
              | React.MouseEvent<HTMLButtonElement>,
          ) => handleEditCard(event)}
        >
          Make Changes
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="large"
          classes={{
            label: classes.buttonLabel,
            root: classes.submitButton,
          }}
          onClick={(
            event:
              | React.MouseEvent<HTMLAnchorElement>
              | React.MouseEvent<HTMLButtonElement>,
          ) => handleCreateCard(event)}
        >
          Create Card
        </Button>
      )}
    </>
  );
};

export default CardFormButtons;
