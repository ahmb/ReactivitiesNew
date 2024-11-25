import { useField } from "formik";
import { useEffect, useState } from "react";
import { Form, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  // type?: string;
  label?: string;
  defaultValue: number;
}

export default function MyTextNumberInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  const [value, setValue] = useState(props.defaultValue);

  useEffect(() => {
    helpers.setValue(value);
  }, []);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input
        {...field}
        // {...props}
        name={props.name}
        placeholder={props.placeholder}
        // type={props.type}
        value={field.value ?? 0}
        // defaultValue={props.defaultValue}
        onChange={(value) => {
          // setValue(0);
          helpers.setValue(value.currentTarget.value);
        }}
      />

      {meta.touched && meta.error ? (
        <Label basic pointing color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
