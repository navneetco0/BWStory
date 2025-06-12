import React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";
import { normalize } from "../../utils";
import { TEXT_PRIMARY_COLOR } from "../../configs";

export type TypographyVariant =
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "H5"
  | "B1"
  | "B2"
  | "B3"
  | "P1"
  | "P2"
  | "P3";

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
  lineHeight?: TextStyle["lineHeight"];
  style?: TextStyle;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "H1",
  color,
  fontSize,
  lineHeight,
  fontWeight,
  style = {},
  children,
  ...props
}) => {
  const textStyles: TextStyle[] = [
    styles[variant],
    color ? ({ color } as TextStyle) : {},
    fontSize ? ({ fontSize: normalize(fontSize) } as TextStyle) : {},
    lineHeight ? ({ lineHeight: normalize(lineHeight) } as TextStyle) : {},
    fontWeight ? ({ fontWeight } as TextStyle) : {},
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};
const styles = StyleSheet.create<Record<TypographyVariant, TextStyle>>({
  H1: {
    fontSize: normalize(28),
    fontFamily: "Inter 18pt SemiBold",
    color: TEXT_PRIMARY_COLOR,
  },
  H2: {
    fontSize: normalize(24),
    fontFamily: "Inter 18pt SemiBold",
    color: TEXT_PRIMARY_COLOR,
  },
  H3: {
    fontSize: normalize(20),
    fontFamily: "Inter 18pt SemiBold",
    color: TEXT_PRIMARY_COLOR,
  },
  H4: {
    fontSize: normalize(18),
    fontFamily: "Inter 18pt SemiBold",
    color: TEXT_PRIMARY_COLOR,
  },
  H5: {
    fontSize: normalize(16),
    fontFamily: "Inter 18pt SemiBold",
    color: TEXT_PRIMARY_COLOR,
  },
  B1: {
    fontSize: normalize(16),
    fontFamily: "Inter 18pt Medium",
    color: TEXT_PRIMARY_COLOR,
  },
  B2: {
    fontSize: normalize(14),
    fontFamily: "Inter 18pt Medium",
    color: TEXT_PRIMARY_COLOR,
    opacity: 0.6,
  },
  B3: {
    fontSize: normalize(12),
    fontFamily: "Inter 18pt Medium",
    color: TEXT_PRIMARY_COLOR,
    opacity: 0.6,
  },
  P1: {
    fontSize: normalize(16),
    color: TEXT_PRIMARY_COLOR,
    fontFamily: "Inter 18pt Medium",
    lineHeight: normalize(24),
    opacity: 0.6,
  },
  P2: {
    fontSize: normalize(14),
    color: TEXT_PRIMARY_COLOR,
    fontFamily: "Inter 18pt Medium",
    opacity: 0.6,
    lineHeight: normalize(22),
  },
  P3: {
    fontSize: normalize(12),
    color: TEXT_PRIMARY_COLOR,
    fontFamily: "Inter 18pt Medium",
    opacity: 0.6,
    lineHeight: normalize(19),
  },
});