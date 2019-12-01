// import { DefaultTheme } from 'styled-components'

export const defaultTheme = {
  colorWhiteDark: 'hsl(0, 0%, 96%)',
  colorWhite: 'hsl(0, 0%, 99%)',
  colorGreyLight: 'hsl(0, 0%, 35%)',
  colorGrey: 'hsl(0, 0%, 30%)',
  colorGreyDark: 'hsl(0, 0%, 20%)',
  colorGreyDarker: 'hsl(0, 0%, 15%)',
  colorBlack: 'hsl(0, 0%, 10%)',
  colorRed: 'hsl(0, 100%, 60%)',
}

export const lightTheme = {
  ...defaultTheme,
  colorBackground: defaultTheme.colorWhite,
  colorHeader: defaultTheme.colorGreyDark,
  colorFont: defaultTheme.colorGreyDarker,
  boxShadow: defaultTheme.colorGrey,
  colorReset: defaultTheme.colorGreyLight,
}

export const darkTheme = {
  ...defaultTheme,
  colorBackground: defaultTheme.colorGreyDark,
  colorHeader: defaultTheme.colorWhiteDark,
  colorFont: defaultTheme.colorWhite,
  boxShadow: defaultTheme.colorWhite,
  colorReset: defaultTheme.colorWhite,
}
