import { useField } from "formik";
import React, { useState } from "react";
import { Form, Label } from "semantic-ui-react";
import Select from "react-select";

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
}

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla2", label: "Vanilla2" },
  { value: "vanilla3", label: "Vanilla3" },
  { value: "vanilla4", label: "Vanilla4" },
];

export default function MyMultiSelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      {/* <Select 
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(e, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            /> */}

      <Select
        placeholder={props.placeholder}
        options={props.options}
        value={field.value || "null"}
        isClearable
        isMulti
        defaultValue={[props.options[1]] ?? "Select upto 3"}
        name='multiCategorySelect'
        className='basic-multi-select'
        classNamePrefix='select'
        delimiter='#786#'
        // isMulti={true}
        // onChange={(v) => (console.log(v))}
        onChange={(v) => (v.length < 4 ? helpers.setValue(v) : null)}
        onBlur={() => helpers.setTouched(true)}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
