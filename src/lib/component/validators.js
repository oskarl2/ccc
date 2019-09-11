export function inArray(validValues) {
  return function(value) {
    return validValues.includes(value);
  };
}
