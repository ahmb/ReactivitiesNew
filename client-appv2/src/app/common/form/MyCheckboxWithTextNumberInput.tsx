import { useField } from "formik";
import { useEffect, useState } from "react";
import {
  Checkbox,
  CheckboxProps,
  Form,
  Icon,
  Label,
  Popup,
} from "semantic-ui-react";
import MyTextNumberInput from "./MyTextNumberInput";

interface Props extends CheckboxProps {
  name: string;
  type?: "checkbox" | "radio" | undefined;
  label?: string;
  defaultValue?: number | undefined;
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
    console.log("props are");
    console.log(props);
    helpers.setValue(props.defaultValue ?? null);
    if (props.defaultValue) {
      props.defaultValue === 0 ? setIsChecked(false) : setIsChecked(true);
    }
  }, [props.defaultValue]);

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
        checked={field.value === 0 ? false : true}
        onChange={
          props.onChange ??
          ((_e, data) => {
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
