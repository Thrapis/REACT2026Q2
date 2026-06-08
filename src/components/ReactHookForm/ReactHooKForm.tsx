import { useForm } from 'react-hook-form';
import { type SumbittedForm } from '@/types/SumbittedForm';
import { useFormStore } from '@/stores/FormStore';

import './ReactHookForm.css';

interface ReactHookFormProps {
  onClose: VoidFunction;
}

const ReactHookForm = ({ onClose }: ReactHookFormProps) => {
  const { register, handleSubmit } = useForm<SumbittedForm>({
    defaultValues: {
      name: '',
      age: 18,
      email: '',
      gender: '',
      termsAndConditions: false,
    },
  });
  const { addForm } = useFormStore();

  const onSubmit = (formData: SumbittedForm) => {
    addForm(formData);
    onClose();
  };

  return (
    <form className="rh-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="rh-form-entry">
        <label htmlFor="rh-name">Name:</label>
        <input
          type="text"
          id="rh-name"
          {...register('name', { required: 'Name is required' })}
        />
      </div>

      <div className="rh-form-entry">
        <label htmlFor="rh-email">Email:</label>
        <input
          type="email"
          id="rh-email"
          {...register('email', { required: 'Email is required' })}
        />
      </div>

      <div className="rh-form-entry">
        <label htmlFor="rh-age">Age:</label>
        <input
          type="number"
          id="rh-age"
          {...register('age', { required: 'Age is required' })}
        />
      </div>

      <div className="rh-form-entry">
        <label htmlFor="rh-gender">Gender:</label>
        <select
          id="rh-gender"
          {...register('gender', { required: 'Gender is required' })}
        >
          <option>Unknown</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div className="rh-form-entry terms">
        <input
          type="checkbox"
          id="rh-terms"
          {...register('termsAndConditions', {
            required: 'Accepting Terms and Conditions is required',
          })}
        />
        <label htmlFor="rh-terms">Terms and Conditions</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReactHookForm;
