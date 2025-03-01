import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const customPreset = definePreset(Aura, {
  components: {},
  semantic: {
    primary: {
      50: '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}',
    },
    colorScheme: {
      light: {
        formField: {
          background: '#ffffff',
        },
        surface: {
          0: '#f0edf7',
        },
        primary: {
          color: '#8b3dff',
          inverseColor: '#ffffff',
          hoverColor: '{violet.700}',
          activeColor: '{violet.700}',
        },
        highlight: {
          background: '{violet.950}',
          focusBackground: '{violet.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{violet.50}',
          inverseColor: '{violet.950}',
          hoverColor: '{violet.100}',
          activeColor: '{violet.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
});

export default customPreset;
