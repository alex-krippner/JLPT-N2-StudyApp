import React, { useReducer } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardFormInput } from '../molecules/CardFormInput';
import cardFormReducer from '../../state-management/cardFormReducer';
import { initCardForm } from '../../utils/formUtilFunctions';
import CardFormContext from '../../context/context';

const Form = ({ children, editing, cardData }: any) => {
  const label = '漢字';
  const [cardFormData, dispatchFormAction] = useReducer(
    cardFormReducer,
    initCardForm(editing, cardData, label),
  );
  return (
    <CardFormContext.Provider
      value={{ cardFormData, dispatchFormAction }}
    >
      {children}
    </CardFormContext.Provider>
  );
};

test('input value changes', () => {
  render(
    <Form>
      <CardFormInput
        inputContainerStyles={{ width: '10px' }}
        inputStyles={{ width: '10px' }}
        placeholder="placeholder"
      />
    </Form>,
  );
  const input = screen.getByPlaceholderText('Placeholder');
  userEvent.type(input, 'new input');
  expect(input).toHaveValue('new input');
});

test('');
