const getCSSMeasure = (varName: string): number => {
  return +window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(`--${varName}`)
    .replace("px", "");
};

const setCSSMeasure = (varName: string, value: string): void => {
  document.documentElement.style.setProperty(`--${varName}`, value + "px");
};

export { getCSSMeasure, setCSSMeasure };

