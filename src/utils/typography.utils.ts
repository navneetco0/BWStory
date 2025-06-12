import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375;

export const normalize = (size: number) => {
  const newSize = size * scale;
  return PixelRatio.roundToNearestPixel(newSize);
};

export const toLowerCase = (str: string): string => str?.toLowerCase?.();
export const toUpperCase = (str: string): string => str?.toUpperCase?.();
export const toTitleCase = (str: string): string =>
  str?.replace?.(/\b\w/g, char => char?.toUpperCase?.());

export function shortenNumber(num: number) {
  if (num < 1000) return num.toString();
  if (num < 1_000_000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  if (num < 1_000_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
  return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'b';
}

export function numberToOrdinal(n: number): string {
  const rule =
    n % 10 === 1 && n % 100 !== 11
      ? 'st'
      : n % 10 === 2 && n % 100 !== 12
      ? 'nd'
      : n % 10 === 3 && n % 100 !== 13
      ? 'rd'
      : 'th';
  return `${n}${rule}`;
}