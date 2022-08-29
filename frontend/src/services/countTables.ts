export const countTables = (amount: number) => {
  if (amount > 0 && amount <= 6) {
    return 1
  } else if (amount >= 6 && amount <= 12) {
    return 2
  } else if (amount >= 13 && amount <= 18) {
    return 3
  } else if (amount >= 19 && amount <= 24) {
    return 4
  } else if (amount >= 25 && amount <= 30) {
    return 5
  } else if (amount >= 31 && amount <= 36) {
    return 6
  } else if (amount >= 37 && amount <= 42) {
    return 7
  } else if (amount >= 43 && amount <= 48) {
    return 8
  } else if (amount >= 49 && amount <= 54) {
    return 9
  } else if (amount >= 55 && amount <= 60) {
    return 10
  } else if (amount >= 61 && amount <= 66) {
    return 11
  } else if (amount >= 67 && amount <= 72) {
    return 12
  } else if (amount >= 73 && amount <= 78) {
    return 13
  } else if (amount >= 79 && amount <= 84) {
    return 14
  } else if (amount >= 85 && amount <= 90) {
    return 15
  }
}
