import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardMenu from '../molecules/CardMenu';

const CardFormComponent = () => (
  <div id="mock-card-form">mock CardForm</div>
);

const foo = <CardFormComponent />;
const mockDeleteHandler = jest.fn();

const MockContainer = () => {
  return (
    <div id="anchor">
      <CardMenu
        cardId="anchor"
        CardFormComponent={foo}
        handleDelete={mockDeleteHandler}
      />
    </div>
  );
};

test('opening the card form for editing', async () => {
  render(<MockContainer />);
  const menuButton = screen.getByRole('button', { name: 'more' });
  const editButton = screen.getByTestId('edit-menu-item');

  userEvent.click(menuButton);
  userEvent.click(editButton);
  expect(
    await screen.findByText('mock CardForm'),
  ).toBeInTheDocument();
});

test('deleting a card', () => {
  render(<MockContainer />);
  const menuButton = screen.getByRole('button', { name: 'more' });
  const deleteButton = screen.getByTestId('delete-menu-item');

  userEvent.click(menuButton);
  userEvent.click(deleteButton);
  expect(mockDeleteHandler).toHaveBeenCalledTimes(1);
});
