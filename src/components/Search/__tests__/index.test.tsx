import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Search from '..';
import { BUTTON_CONTENT, PLACEHOLDER } from '../constants';

const renderMockedApp = () => render(<Search />);

describe('Search component', () => {
  afterEach(() => {
    cleanup();
  });
  test('should render correctly', async () => {
    renderMockedApp();

    // Input
    expect(await screen.getAllByPlaceholderText(PLACEHOLDER));
    // Button
    expect(await screen.getByRole('button', { name: BUTTON_CONTENT }));
  });

  test('should update content of input', async () => {
    renderMockedApp();

    const input = (await screen.getByPlaceholderText(
      PLACEHOLDER
    )) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(input.value).toBe('Luke');
  });
});
