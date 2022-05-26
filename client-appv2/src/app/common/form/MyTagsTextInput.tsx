import { useField } from "formik";
import React, { useState } from "react";
import { Form, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  maxTagCount?: number;
}

export default function MyTagsTextInput(props: Props) {
  const [field, meta, helper] = useField(props.name);
  const [input, setInput] = useState<string | undefined>("");
  const [tags, setTags] = useState<string[]>([]);

  const onChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e: any) => {
    const { key } = e;
    const trimmedInput = input!.trim();

    if (key === " " && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      if (tags.length <= (props.maxTagCount ?? 10)) {
        setTags((prevState) => [...prevState, trimmedInput]);
        console.log(...tags, input);
        helper.setValue({ ...tags, input });
        setInput("");
      }
    }

    if (key === "Backspace" && !input!.length && tags.length) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      console.log(...tagsCopy, input);
      setTags(tagsCopy);
      helper.setValue({ ...tagsCopy, input });
      setInput(poppedTag);
    }
  };

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      {/* <div className='container'> */}
      <label>{props.label}</label>

      <input
        {...field}
        name='tagInput'
        // name='inputName'
        value={input}
        placeholder={props.placeholder ?? "Enter a tag"}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <div
        style={{
          paddingTop: "10px",
          textAlign: "center",
          fontSize: "medium",
        }}>
        {tags.map((tag) => (
          <span key={tag}>
            <span className='altFontColor'> #</span>
            {tag}
          </span>
        ))}
      </div>
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
      {/* </div> */}
    </Form.Field>
  );
}
