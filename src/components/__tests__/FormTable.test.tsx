import React, { useReducer } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import userEvent from '@testing-library/user-event';
import cardFormReducer from '../../state-management/cardFormReducer';
import { initCardForm } from '../../utils/formUtilFunctions';
import FormTable from '../molecules/FormTable';
import CardFormContext from '../../context/context';

interface CardFormProps<T extends CardDataType> {
  cardData: T | T[];
  editing: boolean;
}
const mockCardData = {
  cardType: 'kanji',
  漢字: '濯',
  mainContent: '濯',
  id: uuidv4(),
  読み: ['タク'],
  単語例: ['洗濯'],
  用例: ['洗濯物を出す'],
  rating: 0,
};

const Form = ({ cardData, editing }: CardFormProps<any>) => {
  const label = '漢字';
  const [cardFormData, dispatchFormAction] = useReducer(
    cardFormReducer,
    initCardForm(editing, cardData, label),
  );

  return (
    <CardFormContext.Provider
      value={{ cardFormData, dispatchFormAction }}
    >
      <FormTable entries={cardFormData['読み']} entryKey="読み" />
    </CardFormContext.Provider>
  );
};

afterEach(cleanup);

test('renders card form data', () => {
  render(<Form cardData={mockCardData} editing />);

  expect(screen.getByText('タク')).toBeInTheDocument();
});

test('deleting entry', () => {
  render(<Form cardData={mockCardData} editing />);
  const deleteButton = screen.getByTestId('delete-entry');

  userEvent.click(deleteButton);
  expect(screen.queryByText('タク')).toBeNull();
});

test('edit entry', () => {
  render(<Form cardData={mockCardData} editing />);
  const editButton = screen.getByTestId('edit-entry');

  userEvent.click(editButton);

  const editInput = screen.getByTestId('edit-entry-input');
  const editDoneButton = screen.getByTestId('edit-entry-done');
  userEvent.type(editInput, 'testing edit entry input');
  userEvent.click(editDoneButton);
  expect(
    screen.getByText('testing edit entry input'),
  ).toBeInTheDocument();
});

test('cancelling editing entry', () => {
  render(<Form cardData={mockCardData} editing />);
  const editButton = screen.getByTestId('edit-entry');

  userEvent.click(editButton);

  const editInput = screen.getByTestId('edit-entry-input');
  const editCancelButton = screen.getByTestId('edit-entry-cancel');

  userEvent.type(editInput, 'testing cancelling editing entry');
  userEvent.click(editCancelButton);

  expect(
    screen.queryByText('testing cancelling editing entry'),
  ).toBeNull();
});
