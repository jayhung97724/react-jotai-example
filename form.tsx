import React from "react";
import { atom, useAtom } from "jotai";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  file: File | null;
}

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  file: null,
};

const formStateAtom = atom<FormState>(initialFormState);

const Form = () => {
  const [formState, setFormState] = useAtom(formStateAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFormState((prevState) => ({ ...prevState, file }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstName", formState.firstName);
    formData.append("lastName", formState.lastName);
    formData.append("email", formState.email);
    formData.append("file", formState.file!);
    console.log(formData); // or send form data to server
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
        File:
        <input type="file" name="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
