export function firstUpper(input = '') {
  return input.substr(0, 1).toUpperCase() +
    input.substr(1).toLowerCase()
}