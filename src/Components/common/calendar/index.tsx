// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import CustomHeader from "./Header";
// import CustomContainer from "./Container";

// // const DatePickerBox = styled.div`
// //   @media screen and (max-width: 768px) {
// //     margin: 2rem 0rem 3rem 0;
// //   }
// //   .popper-className {
// //     position: relative !important;
// //     transform: none !important;
// //     padding: 0;
// //   }
// //   .react-datepicker-wrapper {
// //     display: none;
// //   }
// // `;

// interface CalendarProps {
//   open?: boolean,
//   selected?: Date,
//   onChange?: () => void,
//   customInput?: any,
//   popperClassName?: string,
//   minDate?: Date,
//   maxDate?: Date,
//   maxTime?: string,
//   excludeDates?: Array<any>,
//   dateFormat?: string,
//   formatWeekDay?: any,
//   dayClassName?: string | null,
// }

// const Calendar = ({
//   open,
//   selected,
//   onChange,
//   customInput,
//   popperClassName,
//   minDate,
//   maxDate,
//   maxTime,
//   excludeDates,
//   dateFormat,
//   formatWeekDay,
//   dayClassName = null,
// }: CalendarProps): JSX.Element => {
//   return (
//     <div>
//       <DatePicker
//         open={open}
//         selected={selected}
//         onChange={onChange}
//         customInput={customInput}
//         popperClassName={popperClassName}
//         calendarContainer={CustomContainer}
//         minDate={minDate}
//         maxDate={maxDate}
//         maxTime={maxTime}
//         excludeDates={excludeDates}
//         dateFormat={dateFormat}
//         formatWeekDay={formatWeekDay}
//         dayClassName={dayClassName}
//         renderCustomHeader={CustomHeader}
//       />
//     </div>
//   );
// };

// export default Calendar;
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enGB from "date-fns/locale/en-GB";

registerLocale("en-GB", enGB);

interface IDatePickerProps {
  value: Date | null;
  label?: string;
  selectedDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  invalidMessage?: string;
  onChange: (date: Date | null) => void;
  open?: boolean;
  selected?: Date;
  customInput?: any;
  popperClassName?: string;
  maxTime?: string;
  excludeDates?: Array<any>;
  dateFormat?: string;
  formatWeekDay?: any;
  dayClassName?: string | null;
}

class DatePickerSingleton {
  private static instance: DatePickerSingleton;

  private constructor() {}

  static getInstance(): DatePickerSingleton {
    if (!DatePickerSingleton.instance) {
      DatePickerSingleton.instance = new DatePickerSingleton();
    }

    return DatePickerSingleton.instance;
  }

  getDatePicker = ({ value, onChange, ...rest }: IDatePickerProps) => {
    const [date, setDate] = useState<Date | null>(value);

    const handleChange = (date: Date | null) => {
      setDate(date);
      onChange(date);
    };

    // return <DatePicker selected={date} onChange={handleChange} {...rest} />;
    return null;
  };
}

export default DatePickerSingleton.getInstance().getDatePicker;
