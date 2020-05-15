import { css } from "@emotion/core";

export const theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  lineHeights: {
    body: 1.625,
    heading: 1.25,
  },
  colors: {
    text: "#0C0E0D",
    background: "#FBFAFB",
    primary: "#4D1C21",
    secondary: "#B9462C",
    tertiary: "#E8A25F",
  },
  shadows: {
    box: "0px 5px 12px rgba(0, 0, 0, 0.05), 0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
};

export const globalStyles = css`
  root {
    font-family: ${theme.fonts.body};
    line-height: ${theme.lineHeights.body};
    font-weight: ${theme.fontWeights.body};
  }
  body {
    background: ${theme.colors.tertiary};
    color: ${theme.colors.text};
    font-size: ${theme.fontSizes[3]}px;
  }
  h1 {
    color: ${theme.colors.text};
    font-family: ${theme.fonts.heading};
    line-height: ${theme.lineHeights.heading};
    font-weight: ${theme.fontWeights.heading};
    font-size: ${theme.fontSizes[5]}px;
  }

  h2 {
    color: ${theme.colors.text};
    font-family: ${theme.fonts.heading};
    line-height: ${theme.lineHeights.heading};
    font-weight: ${theme.fontWeights.heading};
    font-size: ${theme.fontSizes[4]}px;
  }

  h3 {
    color: ${theme.colors.text};
    font-family: ${theme.fonts.heading};
    line-height: ${theme.lineHeights.heading};
    font-weight: ${theme.fontWeights.heading};
    font-size: ${theme.fontSizes[3]}px;
  }

  h4 {
    color: ${theme.colors.text};
    font-family: ${theme.fonts.heading};
    line-height: ${theme.lineHeights.heading};
    font-weight: ${theme.fontWeights.heading};
    font-size: ${theme.fontSizes[2]}px;
  }
  p {
    color: ${theme.colors.text};
    font-family: ${theme.fonts.body};
    line-height: ${theme.lineHeights.body};
    font-weight: ${theme.fontWeights.body};
  }

  a {
    color: ${theme.colors.primary};
  }

  button {
    padding: ${theme.space[2]}px ${theme.space[4]}px;
    border-radius: 8px;
    border: none;
    font-size: ${theme.fontSizes[3]}px;
    box-shadow: ${theme.shadows.box};
  }
`;
