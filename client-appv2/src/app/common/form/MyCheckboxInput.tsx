import { useField } from "formik";
import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  CheckboxProps,
  Form,
  Icon,
  Label,
  Popup,
  PopupContent,
  Select,
  StrictCheckboxProps,
} from "semantic-ui-react";

interface Props extends CheckboxProps {
  name: string;
  type?: "checkbox" | "radio" | undefined;
  label?: string;
  defaultValue: string | number | undefined;
  popUpContent?: string;
  onChange?: (event: any, data: any) => void;
}

export default function MyCheckboxInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  useEffect(() => {
    helpers.setValue(props.defaultValue ?? null);
  }, []);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <Checkbox
        toggle
        name={props.name}
        label={props.label}
        type={props.type || "radio"}
        // value={privateEvent}
        // checked={privateEvent === 1}
        value={field.value || 0}
        onChange={
          props.onChange ??
          ((e, data) => {
            console.log(data);
            helpers.setValue(data.checked ? 1 : 0);
          })
        }
      />
      {props.popUpContent && (
        <Popup
          content={props.popUpContent}
          trigger={<Icon name='question' circular style={{ float: "right" }} />}
        />
      )}

      {meta.touched && meta.error ? (
        <Label basic pointing color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
