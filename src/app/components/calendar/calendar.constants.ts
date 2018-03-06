interface IColor {
  readonly primary: string,
  readonly secondary: string
}

interface IColors {
  readonly red: IColor
  readonly blue: IColor
  readonly yellow: IColor
}

export const COLORS: IColors = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
