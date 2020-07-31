import {useState} from 'react';

export const useForm = initialState => {
  const [form, setForm] = useState(initialState);

  const change = e => {
    console.log(e);
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'number' ? Number(e.target.value) : e.target.value,
    });
  };

  // form data, change function, reset form function
  return [form, change, () => setForm(initialState)];
};
