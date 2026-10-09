// @flow
//
//  Copyright (c) 2020-present, Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import * as React from "react";
import { ThemeContext } from "styled-components";

// Semantic UI colors for the app chrome. The base palette mirrors colors.module.scss, which SCSS
// files still use directly; keep the two in sync when changing shared values.
//
// "tint" colors are translucent overlays in the foreground color (lighten on a dark theme), and
// "shade" colors are translucent overlays that darken whatever is beneath them.
const colors = {
  background: "#121217",
  panelBackground: "#1a1a1f",
  toolbar: "#2d2c33",
  toolbarFixed: "#1f1e27",
  toolbarBackground: "rgba(0, 0, 0, 0.9)",
  tooltipBackground: "rgba(71, 69, 81, 0.9)",
  surfaceInset: "#222",
  surfaceRaised: "#333",
  backgroundControl: "rgba(247, 247, 243, 0.1)",
  backgroundControlSelected: "rgba(59, 46, 118, 0.6)",
  menuItemSelected: "rgba(59, 46, 118, 0.6)",
  menuItemHover: "#3b2e76",
  divider: "rgba(247, 247, 243, 0.1)",

  foreground: "white",
  textBright: "rgba(247, 247, 243, 0.88)",
  textNormal: "rgba(247, 247, 243, 0.77)",
  textMuted: "rgba(247, 247, 243, 0.3)",
  textDisabled: "rgba(247, 247, 243, 0.15)",
  textSecondary: "#aaa",
  textInactive: "#777",
  textFaint: "#666",
  textInput: "rgba(0, 0, 0, 0.8)",
  textInputDisabled: "rgba(0, 0, 0, 0.3)",

  tintFaint: "rgba(255, 255, 255, 0.1)",
  tintLight: "rgba(255, 255, 255, 0.2)",
  tintMedium: "rgba(255, 255, 255, 0.3)",
  tintStrong: "rgba(255, 255, 255, 0.5)",
  shadeLight: "rgba(0, 0, 0, 0.2)",
  shadeMedium: "rgba(0, 0, 0, 0.5)",
  shadeHeavy: "rgba(0, 0, 0, 0.75)",
  modalBackdrop: "black",

  highlight: "#29bee7",
  accent: "#22b5ff",
  green: "#05d27d",
  lightGreen: "#5cd6a9",
  yellow: "#f5d358",
  orange: "#ccb862",
  red: "#ff7c96",
  lightPurple: "#c1c5d6",
  grey: "#e7e9ef",
  errorBackground: "red",
  errorHeading: "coral",

  chartText: "#eee",
  chartGridLine: "rgba(255, 255, 255, 0.2)",
  chartHoverLine: "yellow",
  diffAddedBackground: "#182924",
  diffDeletedBackground: "#3d2327",
};

const shadows = {
  popover: "0 6px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.25)",
};

export type ThemeColors = { [$Keys<typeof colors>]: string };
export type ThemeShadows = { [$Keys<typeof shadows>]: string };
export type Theme = {| colors: ThemeColors, shadows: ThemeShadows |};
export type ThemeColorName = $Keys<typeof colors>;
export type ThemeShadowName = $Keys<typeof shadows>;

export const defaultTheme: Theme = { colors, shadows };

// Components can render outside the ThemeProvider (renderToBody, tests, stories), where
// styled-components supplies an empty theme object. Fall back to the default theme there.
export function resolveTheme(theme: ?($Shape<Theme> | {})): Theme {
  return theme && theme.colors && theme.shadows ? (theme: any) : defaultTheme;
}

// For styled-components templates: `color: ${themeColor("textMuted")};`
export function themeColor(name: ThemeColorName) {
  return ({ theme }: { theme?: ?($Shape<Theme> | {}) }): string => resolveTheme(theme).colors[name];
}

export function themeShadow(name: ThemeShadowName) {
  return ({ theme }: { theme?: ?($Shape<Theme> | {}) }): string => resolveTheme(theme).shadows[name];
}

export function useTheme(): Theme {
  return resolveTheme(React.useContext(ThemeContext));
}
