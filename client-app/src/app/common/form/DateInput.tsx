import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta: { touched, error },
  id,
  date= false,
  time = false,
  ...rest
}) => { 
  return (
    <Form.Field style={{borderRadius:'10px'}} error={touched && !!error} width={width}>
      <DateTimePicker
        placeholder={placeholder}
        value={input.value || null}
        onChange={input.onChange}
        id={id?.toString()}
        onBlur={input.onBlur}
        onKeyDown={(e)=> e.preventDefault()}
        format={undefined}//{(value: any) => value === '' ? undefined : new Date(value)}
        date={date}
        time={time}
        {...rest}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
