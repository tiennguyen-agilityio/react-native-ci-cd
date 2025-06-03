import {render, screen} from '@testing-library/react-native';

import Text from '..';
import {colors, fontSizes} from '@/themes';

jest.mock('@/hooks', () => ({
  useThemeStore: jest.fn(() => ({
    theme: {
      fonts: {
        primary: {
          bold: 'Primary-Bold',
          regular: 'Primary-Regular',
        },
        secondary: {medium: 'Secondary-Medium'},
        tertiary: {regular: 'Tertiary-Regular'},
        default: {
          bold: 'Default-Bold',
          medium: 'Default-Medium',
          regular: 'Default-Regular',
        },
      },
      text: {
        default: '#000000',
        primary: '#111111',
        quaternary: '#222222',
      },
    },
  })),
}));

describe('Text', () => {
  const props = {
    children: 'Lorem ipsum dolor sit amet',
  };
  it('renders default', () => {
    const {toJSON} = render(<Text {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with variant heading', () => {
    const {toJSON} = render(<Text {...props} variant="heading" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with variant title', () => {
    const {toJSON} = render(<Text {...props} variant="title" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with variant subTitle', () => {
    const {toJSON} = render(<Text {...props} variant="subTitle" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with variant description', () => {
    const {toJSON} = render(<Text {...props} variant="description" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with custom color, fontsize', () => {
    const {toJSON} = render(
      <Text {...props} color={colors.green[500]} fontSize={fontSizes['3xl']} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('falls back to default font if fonts.primary.bold is missing', () => {
    (useThemeStore as jest.Mock).mockReturnValueOnce({
      theme: {
        fonts: {
          default: {bold: 'Default-Bold'},
        },
        text: {
          default: '#000000',
        },
      },
    });

    render(<Text variant="heading">Fallback Font</Text>);
    const element = screen.getByText('Fallback Font');
    console.log('STYLE:', element.props.style); // helpful debug

    const fontFamilyStyle = (element.props.style || []).find((s: any) => s && s.fontFamily);

    expect(fontFamilyStyle).toBeDefined();
  });
});
