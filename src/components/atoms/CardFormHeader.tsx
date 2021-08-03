import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CardFormContext from '../../context/context';

const useStyles = makeStyles({
  root: {
    '& .MuiFormLabel-root': {
      fontSize: 'var(--font-size-small)',
    },
    '& .MuiInputBase-input': {
      fontSize: 'var(--font-size-small)',
    },
  },
  textfield: {
    marginTop: '2.5rem',
  },
});

type CardFormHeaderProps = {
  editing: boolean;
  cardFormData: any;
  hasTextfield?: boolean;
  label?: CardLabels;
  styles: any;
};

const CardFormHeader = ({
  editing,
  cardFormData,
  hasTextfield,
  label,
  styles,
}: CardFormHeaderProps) => {
  const classes = useStyles();
  const { dispatchFormAction } = useContext(CardFormContext);

  const handleChange = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    dispatchFormAction({
      type: 'INPUT_MAIN',
      value,
      label,
    });
  };

  return (
    <header style={styles.headerStyles}>
      {editing ? (
        <>
          <h2 className="header-title" style={styles.cardTitleStyles}>
            Edit Card
          </h2>

          <h2 style={styles.cardFrontStyles}>
            {'mainContent' in cardFormData
              ? cardFormData.mainContent
              : ''}{' '}
          </h2>
        </>
      ) : (
        <>
          <h2 style={styles.cardTitleStyles}>New Card</h2>
          {hasTextfield ? (
            <TextField
              key={label}
              id="outlined-basic"
              label={label}
              value={cardFormData[label]}
              variant="filled"
              className={`${classes.root} ${classes.textfield}`}
              onChange={handleChange}
            />
          ) : (
            ''
          )}
        </>
      )}
    </header>
  );
};

export default CardFormHeader;
