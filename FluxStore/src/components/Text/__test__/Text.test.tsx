import {render, screen} from '@testing-library/react-native';
import Text from '..';
import {colors, fontSizes, fontWeights, lineHeights} from '@/themes';
import {useThemeStore} from '@/stores';

jest.mock('@/stores/theme.ts', () => ({
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
      <Text
        {...props}
        color={colors.green[500]}
        fontSize={fontSizes['3xl']}
        fontWeight={fontWeights.medium}
        lineHeight={lineHeights.lg}
        textAlign="left"
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('falls back to default font if fonts.primary.bold is missing', () => {
    (useThemeStore as unknown as jest.Mock).mockReturnValueOnce({
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

    const fontFamilyStyle = (element.props.style || []).find((s: any) => s && s.fontFamily);

    expect(fontFamilyStyle).toBeDefined();
  });
});
