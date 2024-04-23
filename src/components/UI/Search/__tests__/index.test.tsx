import { cleanup, render, screen } from '@testing-library/react';
import Search from '..';
import { PLACEHOLDER } from '../constants';

const renderMockedApp = ({ search = '' }: { search?: string } = {}) =>
  render(<Search search={search} setSearch={jest.fn()} />);

describe('Search component', () => {
  afterEach(() => {
    cleanup();
  });
  test('should render correctly', async () => {
    renderMockedApp();

    // Input
    expect(await screen.getAllByPlaceholderText(PLACEHOLDER));
  });

  test('should update content of input', async () => {
    renderMockedApp({ search: 'Luke' });

    const input = (await screen.getByPlaceholderText(
      PLACEHOLDER
    )) as HTMLInputElement;

    expect(input.value).toBe('Luke');
  });
});
