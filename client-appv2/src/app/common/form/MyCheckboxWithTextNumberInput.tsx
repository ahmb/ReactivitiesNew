import { useField } from "formik";
import React, { useEffect, useState } from "react";
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
import MyTextNumberInput from "./MyTextNumberInput";

interface Props extends CheckboxProps {
  name: string;
  type?: "checkbox" | "radio" | undefined;
  label?: string;
  defaultValue?: string | number | undefined;
  popUpContent?: string;
  onChange?: (event: any, data: any) => void;
  textInputName: string;
  textInputPlaceholder: string;
  textInputLabel: string;
  textInputDefaultValue: number;
}

export default function MyCheckboxWithTextNumberInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  const [isChecked, setIsChecked] = useState(false);

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
            setIsChecked(data.checked ?? false);
          })
        }
      />
      {props.popUpContent && (
        <Popup
          content={props.popUpContent}
          trigger={
            <Icon
              name='question'
              // floated='right'
              // size="
              circular
              style={{ float: "right" }}
            />
          }
        />
      )}
      {isChecked && (
        <>
          <MyTextNumberInput
            name={props.textInputName}
            placeholder={props.textInputPlaceholder}
            label={props.textInputLabel}
            defaultValue={props.textInputDefaultValue}
          />
        </>
      )}

      {meta.touched && meta.error ? (
        <Label basic pointing color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
