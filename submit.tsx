import React, { useRef } from "react";
import { atom, useAtom } from "jotai";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  selectedFile: File | null;
}

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  selectedFile: null,
};

const formStateAtom = atom<FormState>(initialFormState);

const Form = () => {
  const [formState, setFormState] = useAtom(formStateAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFormState((prevState) => ({ ...prevState, selectedFile }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("firstName", formState.firstName);
    formData.append("lastName", formState.lastName);
    formData.append("email", formState.email);
    if (formState.selectedFile) {
      formData.append("file", formState.selectedFile);
    }

    try {
      const response = await fetch("http://example.com/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      console.log("Form submitted successfully!");
      setFormState(initialFormState);
    } catch (error) {
      console.error(error);
    }
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
        Select File:
        <input
          type="file"
          name="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
