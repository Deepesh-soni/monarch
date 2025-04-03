export const PENDING = "PENDING";
export const IN_REVIEW = "IN_REVIEW";
export const ACTIVE = "ACTIVE";
export const PUBLISHED = "PUBLISHED";

export const formatDateTime = (date, time) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  let [hours, minutes] = time.split(":").map(Number);
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedTime = `${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${amPm}`;

  return `${formattedDate} at ${formattedTime}`;
};

export const numberToWords = num => {
  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const thousands = ["", "thousand", "lakh", "crore"];

  if (num === 0) return "zero";
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) {
    const tensIndex = Math.floor(num / 10);
    const onesIndex = num % 10;
    return tens[tensIndex] + (onesIndex === 0 ? "" : " " + ones[onesIndex]);
  }
  if (num < 1000) {
    const hundredsIndex = Math.floor(num / 100);
    const rest = num % 100;
    return (
      ones[hundredsIndex] +
      " hundred" +
      (rest === 0 ? "" : " and " + numberToWords(rest))
    );
  }
  if (num < 100000) {
    const thousandsIndex = Math.floor(num / 1000);
    const rest = num % 1000;
    return (
      numberToWords(thousandsIndex) +
      " thousand" +
      (rest === 0 ? "" : " " + numberToWords(rest))
    );
  }
  if (num < 10000000) {
    const lakhsIndex = Math.floor(num / 100000);
    const rest = num % 100000;
    return (
      numberToWords(lakhsIndex) +
      " lakh" +
      (rest === 0 ? "" : " " + numberToWords(rest))
    );
  }
  if (num < 1000000000) {
    const croresIndex = Math.floor(num / 10000000);
    const rest = num % 10000000;
    return (
      numberToWords(croresIndex) +
      " crore" +
      (rest === 0 ? "" : " " + numberToWords(rest))
    );
  }
};
