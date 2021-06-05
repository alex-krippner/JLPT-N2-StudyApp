import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
  cardType: string;
  label: CardLabels;
  handleChange: (event: React.ChangeEvent) => void;
  styles?: any;
};

const CardFormHeader = ({
  editing,
  cardFormData,
  cardType,
  label,
  handleChange,
  styles,
}: CardFormHeaderProps) => {
  const classes = useStyles();
  console.log(styles);
  console.log('editing is ', editing);
  return (
    <header style={styles.headerStyles}>
      {editing ? (
        <>
          <h2 style={styles.cardTitleStyles}>Edit Card</h2>

          <h2 style={styles.cardFrontStyles}>
            {'mainContent' in cardFormData
              ? cardFormData.mainContent
              : ''}{' '}
          </h2>
        </>
      ) : (
        <>
          <h2 style={styles.cardTitleStyles}>New Card</h2>
          {/* TODO: replace cardType with hasTextfield boolean */}
          {cardType === 'reading' ? (
            ''
          ) : (
            <TextField
              key={label}
              id="outlined-basic"
              label={label}
              value={cardFormData[label]}
              variant="filled"
              className={`${classes.root} ${classes.textfield}`}
              onChange={handleChange}
            />
          )}
        </>
      )}
    </header>
  );
};

export default CardFormHeader;
