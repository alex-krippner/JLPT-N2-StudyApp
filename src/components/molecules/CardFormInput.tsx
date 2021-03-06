import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as utils from '../../utils/utilitiesFunctions';
import CardFormContext from '../../context/context';
import ButtonIcon from './ButtonIcon';

interface CardFormInputProps {
  inputContainerStyles: Partial<React.CSSProperties>;
  inputStyles: Partial<React.CSSProperties>;
  placeholder: string;
}

const useStyles = makeStyles({
  inputContainer: {
    fontSize: (props: CardFormInputProps) =>
      props.inputContainerStyles.fontSize,
    justifyContent: (props: CardFormInputProps) =>
      props.inputContainerStyles.justifyContent,
    marginBottom: (props: CardFormInputProps) =>
      props.inputContainerStyles.marginBottom,
    visibility: (props: CardFormInputProps) =>
      props.inputContainerStyles.visibility,
  },
  input: {
    fontSize: (props: CardFormInputProps) =>
      props.inputStyles.fontSize,
  },
});

export const CardFormInput = (props: CardFormInputProps) => {
  const classes = useStyles(props);
  const { placeholder } = props;
  const { dispatchFormAction } = useContext(CardFormContext);
  const [entry, setEntry] = useState('');

  const handleEntryInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEntry(event.target.value);
  };

  const handleAddEntryBtn = (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    dispatchFormAction({
      type: 'ADD_ENTRY',
      placeholder,
      entry,
    });
    setEntry('');
  };

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      className={classes.inputContainer}
      id="grid-entry-input"
    >
      <Grid item xs={6}>
        <Input
          fullWidth
          value={entry}
          className={classes.input}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleEntryInput(event)
          }
          placeholder={utils.capitalizeFirstWord(placeholder)}
          id="entry-input"
        />
      </Grid>
      <Grid item>
        <ButtonIcon
          clickHandler={handleAddEntryBtn}
          Icon={AddCircleOutlineIcon}
          iconSize="var(--font-size-large)"
        />
      </Grid>
    </Grid>
  );
};
