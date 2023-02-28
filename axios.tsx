// 給我一個使用 react 框架結合 jotai 並且以 typescript 寫成之包含 file 上傳處理的 form 表單範例，
// 並且在提交表單時，將表單內容整理成 json 格式再連同 file 包裝到 multipart/form-data，並以 axios 送出request
import { useState } from "react";
import { useAtom } from "jotai";
import axios from "axios";

interface FormValues {
  name: string;
  email: string;
  file?: File;
}

const initialValues: FormValues = {
  name: "",
  email: "",
};

const formAtom = atom(initialValues);

const Form = () => {
  const [formValues, setFormValues] = useAtom(formAtom);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFormValues((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("data", JSON.stringify(formValues));
    if (formValues.file) {
      formData.append("file", formValues.file);
    }

    try {
      const response = await axios.post("/api/submit-form", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setFormValues(initialValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        File:
        <input type="file" name="file" onChange={handleFileChange} />
      </label>
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};
