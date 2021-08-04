import React from 'react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import AddCardPopover from '../molecules/AddCardPopover';

const MockComponent = () => <div title="test">Hello</div>;
const foo: any = <MockComponent />;
const MockContainer = () => {
  return (
    <div>
      <h1 id="main">I'm a container </h1>
      <AddCardPopover CardFormComponent={foo} anchorTarget="main" />,
    </div>
  );
};

test('opening the popover', async () => {
  render(<MockContainer />);

  const button = screen.getByRole('button');

  userEvent.click(button);

  expect(await screen.findByText('Hello')).toBeInTheDocument();
});
