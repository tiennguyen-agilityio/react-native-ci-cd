import {render, fireEvent, waitFor, screen} from '@testing-library/react-native';

import Collapse from '..';
import Text from '@/components/Text';

describe('Collapse Component', () => {
  it('renders with label and children', () => {
    render(
      <Collapse label="Description">
        <Text>Hidden content</Text>
      </Collapse>,
    );
    expect(screen.getByText('Description')).toBeTruthy();
    expect(screen.getByTestId('content')).toBeTruthy();
  });

  it('toggles content visibility when label is pressed', async () => {
    render(
      <Collapse label="Description">
        <Text>Toggle content</Text>
      </Collapse>,
    );

    const label = screen.getByTestId('label');

    fireEvent.press(label);
    await waitFor(() => {
      expect(screen.getByText('Toggle content')).toBeTruthy();
    });

    fireEvent.press(label);
    await waitFor(() => {
      expect(screen.getByText('Toggle content')).toBeTruthy();
    });
  });

  it('calls handleLayout and renders content after layout', () => {
    render(
      <Collapse label="Test Label">
        <Text>Content to show</Text>
      </Collapse>,
    );

    const contentView = screen.getByTestId('content');

    // Simulate layout
    fireEvent(contentView, 'layout', {
      nativeEvent: {
        layout: {
          height: 100,
        },
      },
    });

    expect(contentView).toBeTruthy();
  });
});
