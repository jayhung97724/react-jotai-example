import React from "react";
import { atom, useAtom } from "jotai";
import Select from "react-select";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  selectedOptions: { label: string; value: string }[];
}

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  selectedOptions: [],
};

const formStateAtom = atom<FormState>(initialFormState);

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
];

const Form = () => {
  const [formState, setFormState] = useAtom(formStateAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (selectedOptions: any) => {
    setFormState((prevState) => ({ ...prevState, selectedOptions }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
    setFormState(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Select Options:
        <Select
          isMulti
          options={options}
          value={formState.selectedOptions}
          onChange={handleSelectChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
