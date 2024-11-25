import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { DatePickerProps } from "react-datepicker";

export default function MyDateInput(props: Partial<DatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        // {...props} // Spread all additional props
        selected={field.value ? new Date(field.value) : null} // Ensure value is a Date or null
        onChange={(date: Date | null) => {
          if (date instanceof Date || date === null) {
            helpers.setValue(date); // Update Formik value
          }
        }}
        minDate={props.minDate || new Date()} // Default minDate to today if not provided
        maxDate={props.maxDate || new Date(2030, 11, 31)} // Default maxDate if not provided
        showMonthYearDropdown
      />
      {meta.touched && meta.error && (
        <Label basic color='red'>
          {meta.error}
        </Label>
      )}
    </Form.Field>
  );
}
