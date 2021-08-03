import React, { useReducer } from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import userEvent from '@testing-library/user-event';
import CardFormHeader from '../atoms/CardFormHeader';
import cardFormReducer from '../../state-management/cardFormReducer';
import { initCardForm } from '../../utils/formUtilFunctions';
import CardFormContext from '../../context/context';

const headerStyles: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
};

interface CardFormProps<T extends CardDataType> {
  editing?: boolean;
  cardData: T | T[];
  hasTextfield?: boolean;
  CardFormHeader: React.ReactElement;
}

const Form = ({
  editing,
  cardData,
  CardFormHeader,
}: CardFormProps<any>) => {
  const label = '漢字';
  const [cardFormData, dispatchFormAction] = useReducer(
    cardFormReducer,
    initCardForm(editing, cardData, label),
  );
  return (
    <CardFormContext.Provider
      value={{ cardFormData, dispatchFormAction }}
    >
      {CardFormHeader}
    </CardFormContext.Provider>
  );
};

const cardData = {
  cardType: 'kanji',
  漢字: '濯',
  mainContent: '濯',
  id: uuidv4(),
  読み: ['タク'],
  単語例: ['洗濯'],
  用例: ['洗濯物を出す'],
  rating: 0,
};

afterEach(cleanup);

describe('Form header when editing', () => {
  beforeEach(() => {
    render(
      <Form
        editing
        cardData={cardData}
        CardFormHeader={
          <CardFormHeader
            editing
            cardFormData={cardData}
            styles={headerStyles}
          />
        }
      />,
    );
  });

  test('the header is Edit Card', () => {
    expect(screen.getByText(/Edit Card/));
  });

  test('the main content is displayed', () => {
    expect(screen.getByText('濯'));
  });
});

describe('Form header when creating', () => {
  beforeEach(() => {
    render(
      <Form
        cardData={cardData}
        editing={false}
        CardFormHeader={
          <CardFormHeader
            editing={false}
            cardFormData={cardData}
            styles={headerStyles}
            hasTextfield
            label="漢字"
          />
        }
      />,
    );
  });

  // when editing the header says Edit Card
  test('the header is New Card', () => {
    expect(screen.getByText(/New Card/));
  });
});
