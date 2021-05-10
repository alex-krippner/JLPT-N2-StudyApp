import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import COLORS from '../../theme/styleConstants';

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
  cardFormData: CardDataType;
  cardType: string;
  label: CardLabels;
  handleChange: (event: React.ChangeEvent) => void;
};

const CardFormHeader = ({
  editing,
  cardFormData,
  cardType,
  label,
  handleChange,
}: CardFormHeaderProps) => {
  const classes = useStyles();

  return (
    <header className="header">
      {editing ? (
        <>
          <h2
            style={{
              background: `${COLORS.greenSeaMedium}`,
            }}
            className="card-title"
          >
            Edit Card
          </h2>

          <h2 className="card-front">
            {'mainContent' in cardFormData
              ? cardFormData.mainContent
              : ''}{' '}
          </h2>
        </>
      ) : (
        <>
          <h2 className="card-title">New Card</h2>
          {cardType === 'reading' ? (
            ''
          ) : (
            <TextField
              key={label}
              id="outlined-basic"
              label={label}
              value={
                'mainContent' in cardFormData
                  ? cardFormData.mainContent
                  : ''
              }
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
