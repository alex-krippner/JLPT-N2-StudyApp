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

const CardFormButton = ({
  editing,
  handleCreateCard,
  handleEditCard,
}: CardFormButtonsProps) => {
  const classes = useStyles();

  const buttonLabel = editing ? 'Make Changes' : 'Create Card';
  const handleClick = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (editing) {
      handleEditCard(e);
    } else {
      handleCreateCard(e);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      classes={{
        label: classes.buttonLabel,
        root: classes.submitButton,
      }}
      onClick={handleClick}
    >
      {buttonLabel}
    </Button>
  );
};

export default CardFormButton;
