import {
  ACCENT_100,
  ACCENT_200,
  ACCENT_400,
  ACCENT_500,
  PRIMARY_100,
  PRIMARY_900,
} from "../../colors";

const dropdownStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    width: "14rem",
    padding: "0.5rem 0.5rem 0.5rem",
    borderRadius: "0.5rem",
    boxShadow: "none",
    borderColor: ACCENT_400,
    "&:hover": {
      borderColor: ACCENT_500,
    },
    cursor: "pointer",
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    padding: "0.25rem",
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    display: "none",
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    padding: "0 0 0 0.5rem",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    margin: 0,
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    fontWeight: "bold",
    color: PRIMARY_900,
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    border: `1px solid ${ACCENT_400}`,
    boxShadow: "0px 0px 8px 4px rgb(0 0 0 / 4%)",
    borderRadius: "0.5rem",
    overflow: "hidden",
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    padding: 0,
    "&::-webkit-scrollbar": {
      display: "none",
      width: "0 !important",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }),
  option: (baseStyles, state) => ({
    padding: 0,
    cursor: "pointer",
    backgroundColor: state.isSelected ? PRIMARY_100 : ACCENT_100,
    "&:hover": {
      backgroundColor: state.isSelected ? PRIMARY_100 : ACCENT_200,
    },
  }),
};

export default dropdownStyles;
