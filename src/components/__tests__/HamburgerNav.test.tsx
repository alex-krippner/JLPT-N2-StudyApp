import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import HamburgerNav from '../molecules/HamburgerNav';

const mockOpenNavHandler = jest.fn();

test('that nav is open', () => {
  render(<HamburgerNav open handleOpen={mockOpenNavHandler} />, {
    wrapper: BrowserRouter,
  });

  expect(screen.getByTestId('drawer')).toBeInTheDocument();
});

test('that nav is closed', () => {
  render(
    <HamburgerNav open={false} handleOpen={mockOpenNavHandler} />,
    {
      wrapper: BrowserRouter,
    },
  );

  expect(screen.queryByTestId('drawer')).toBeNull();
});

test('drawer closes', () => {
  render(<HamburgerNav open handleOpen={mockOpenNavHandler} />, {
    wrapper: BrowserRouter,
  });
  const backDrop = screen
    .getByRole('presentation')
    .querySelector('.MuiBackdrop-root');
  userEvent.click(backDrop);
  expect(mockOpenNavHandler).toHaveBeenCalledTimes(1);
  screen.debug();
});
