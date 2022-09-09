const breakpoints = {
  phone: "440px",
  tablet: "768px",
  desktop: "1100px",
};

export const devices = {
  phone: `(min-width: ${breakpoints.phone})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
};
