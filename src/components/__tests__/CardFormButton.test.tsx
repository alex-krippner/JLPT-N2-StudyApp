import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardFormButton from '../atoms/CardFormButton';

const createCard = jest.fn();
const editCard = jest.fn();

test('label and click handler when editing', () => {
  render(
    <CardFormButton
      editing
      handleCreateCard={createCard}
      handleEditCard={editCard}
    />,
  );
  const button = screen.getByRole('button', {
    name: /make changes/i,
  });

  expect(button).toHaveTextContent('Make Changes');
  userEvent.click(button);
  expect(editCard).toHaveBeenCalledTimes(1);
  expect(createCard).toHaveBeenCalledTimes(0);
});

test('label and click handler when creating', () => {
  render(
    <CardFormButton
      editing={false}
      handleCreateCard={createCard}
      handleEditCard={editCard}
    />,
  );

  const button = screen.getByRole('button', {
    name: /create card/i,
  });

  expect(button).toHaveTextContent('Create Card');
  userEvent.click(button);
  expect(createCard).toHaveBeenCalledTimes(1);
  expect(editCard).toHaveBeenCalledTimes(0);
});
