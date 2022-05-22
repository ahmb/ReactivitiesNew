import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
  placeholder?: string;
  name: string;
  options: any;
  label?: string;
  defaultValue?: any;
}

export default function MySelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  const [defValue, setDefValue] = useState("");

  useEffect(() => {
    helpers.setValue(props.defaultValue);
  }, []);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        search
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(e, d) => {
          helpers.setValue(d.value);
        }}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
