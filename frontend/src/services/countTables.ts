export const countTables = (guests: number) => {
  if (guests > 0 && guests <= 6) {
    return 1
  } else if (guests >= 6 && guests <= 12) {
    return 2
  } else if (guests >= 13 && guests <= 18) {
    return 3
  } else if (guests >= 19 && guests <= 24) {
    return 4
  } else if (guests >= 25 && guests <= 30) {
    return 5
  } else if (guests >= 31 && guests <= 36) {
    return 6
  } else if (guests >= 37 && guests <= 42) {
    return 7
  } else if (guests >= 43 && guests <= 48) {
    return 8
  } else if (guests >= 49 && guests <= 54) {
    return 9
  } else if (guests >= 55 && guests <= 60) {
    return 10
  } else if (guests >= 61 && guests <= 66) {
    return 11
  } else if (guests >= 67 && guests <= 72) {
    return 12
  } else if (guests >= 73 && guests <= 78) {
    return 13
  } else if (guests >= 79 && guests <= 84) {
    return 14
  } else if (guests >= 85 && guests <= 90) {
    return 15
  }
}
