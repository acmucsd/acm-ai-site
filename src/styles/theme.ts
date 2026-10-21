import type { ThemeConfig } from 'antd';

// antd derives palettes from literals. keep in sync with tokens.less
export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#f66161',
    fontFamily: "'DM Sans', Arial, sans-serif",
  },
  components: {
    Timeline: {
      dotBg: 'black',
    },
  },
};
