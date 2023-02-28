// 給我一個使用 react 框架結合 jotai 並且以 typescript 寫成之包含 file 上傳處理的 form 表單範例，並且在提交表單時，將表單內容整理成 json 格式再連同 file 包裝到 multipart/form-data
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
    formData.append(
      "data",
      new Blob([JSON.stringify(formState)], { type: "application/json" })
    );
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
