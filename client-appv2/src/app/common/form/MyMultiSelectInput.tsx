import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import Select from "react-select";

interface Props {
  placeholder: string;
  name: string;
  options: any | null;
  label?: string;
}

export default function MyMultiSelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);

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
        defaultValue={[props.options[1]]}
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
