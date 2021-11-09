import {extendTheme, withDefaultColorScheme, withDefaultProps} from '@chakra-ui/react';

const theme = extendTheme(
    {
        colors: {
            myPurple:
                {
                    50: '#f0eaff',
                    100: '#d1c1f4',
                    200: '#b199e7',
                    300: '#9171dc',
                    400: '#7248d0',
                    500: '#592fb7',
                    600: '#45248f',
                    700: '#311968',
                    800: '#1e0f40',
                    900: '#0c031b',
                }
        }
    },
    withDefaultProps({
        defaultProps: {
            isLazy: true,
        },
        components: ['Menu', 'Popover', "Collapse"],
    }),
    withDefaultColorScheme({ colorScheme: "teal" }),
);

export default theme;