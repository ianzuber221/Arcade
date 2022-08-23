export function getCssVariable(element, property) {
  return parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0;
}

export function setCssVariable(element, property, value) {
  return element.style.setProperty(property, value);
}

export function incrementCssVariable(elem, prop, inc) {
  return setCssVariable(elem, prop, getCssVariable(elem, prop) + inc);
}
