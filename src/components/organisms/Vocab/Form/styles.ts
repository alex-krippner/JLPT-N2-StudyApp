import React from "react";
import COLORS from "@mon-theme/styleConstants";

export const headerStyles: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: "0 1 30%",
  width: "100%",
  marginBottom: "2rem",
  borderRadius: " 0 0 2rem 2rem",
  height: "15%",
};

export const inputContainerStyles: Partial<React.CSSProperties> = {
  fontSize: "var(--font-size-small)",
  justifyContent: "center",
  marginBottom: "1rem",
  visibility: "visible",
};

export const inputStyles: Partial<React.CSSProperties> = {
  fontSize: "var(--font-size-small)",
};

export const cardTitleStyles: React.CSSProperties = {
  position: "absolute",
  top: "var(--top-cardTitle)",
  left: "var(--left-cardTitle)",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "5rem",
  width: "50%",
  marginLeft: "var(--top-cardTitle)",
  borderRadius: "1rem",
  backgroundColor: "var(--color-secondary-medium)",
  boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.2)",
  fontWeight: 400,
  fontSize: "var(--font-size-medium)",
  color: "var(--color-white-dark)",
  background: `${COLORS.greenSeaMedium}`,
};

export const cardFrontStyles: React.CSSProperties = {
  alignSelf: "flex-end",
  fontSize: "var(--font-size-large)",
  color: " var(--color-primary-dark)",
};
