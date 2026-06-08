import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SumbittedFormSchema } from '@/schemas/SumbittedForm.schema';
import { type SumbittedForm } from '@/types/SumbittedForm';
import { useFormStore } from '@/stores/FormStore';
import { convertToBase64 } from '@/utils/ImageProcessing';

import './ReactHookForm.css';

interface ReactHookFormProps {
  onClose: VoidFunction;
}

const ReactHookForm = ({ onClose }: ReactHookFormProps) => {
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<SumbittedForm>({
    defaultValues: {
      age: 18,
      gender: 'Unknown',
    },
    resolver: zodResolver(SumbittedFormSchema),
    mode: 'onChange',
  });
  const { countries, addForm } = useFormStore();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const base64String = await convertToBase64(file);

    setValue('image', base64String);
    await trigger('image');
  };

  const onSubmit = (formData: SumbittedForm) => {
    addForm(formData);
    onClose();
  };

  return (
    <form className="rh-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="rh-form-error-box">
        <div className="rh-form-entry">
          <label htmlFor="rh-name">Name:</label>
          <input type="text" id="rh-name" {...register('name')} />
        </div>
        <div className="rh-form-error-message">{errors.name?.message}</div>
      </div>

      <div className="rh-form-error-box">
        <div className="rh-form-entry">
          <label htmlFor="rh-email">Email:</label>
          <input type="email" id="rh-email" {...register('email')} />
        </div>
        <div className="rh-form-error-message">{errors.email?.message}</div>
      </div>

      <div className="rh-form-error-box">
        <div className="rh-form-entry">
          <label htmlFor="rh-age">Age:</label>
          <input
            type="number"
            id="rh-age"
            {...register('age', { valueAsNumber: true })}
          />
        </div>
        <div className="rh-form-error-message">{errors.age?.message}</div>
      </div>

      <div className="rh-form-error-box">
        <div className="rh-form-entry">
          <label htmlFor="rh-gender">Gender:</label>
          <select id="rh-gender" {...register('gender')}>
            <option>Unknown</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="rh-form-error-message">{errors.gender?.message}</div>
      </div>

      <div className="rh-form-error-box">
        <div className="rh-form-entry">
          <label htmlFor="rh-password">Password:</label>
          <input type="password" id="rh-password" {...register('password')} />
        </div>
        <div className="rh-form-error-message">{errors.password?.message}</div>
      </div>

      <div className="rh-form-error-box">
        <div className="rh-form-entry">
          <label htmlFor="rh-confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="rh-confirm-password"
            {...register('confirmPassword')}
          />
        </div>
        <div className="rh-form-error-message">
          {errors.confirmPassword?.message}
        </div>
      </div>

      <div className="rh-form-error-box">
        <div className="rh-form-entry">
          <label htmlFor="rh-image">Image:</label>
          <input type="hidden" {...register('image')} />
          <input type="file" id="rh-image" onChange={handleFileChange} />
        </div>
        <div className="rh-form-error-message">{errors.image?.message}</div>
      </div>

      <datalist id="country-list">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>

      <div className="rh-form-error-box">
        <div className="rh-form-entry">
          <label htmlFor="rh-country">Country:</label>
          <input
            type="text"
            id="rh-country"
            list="country-list"
            {...register('country')}
          />
        </div>
        <div className="rh-form-error-message">{errors.country?.message}</div>
      </div>

      <div className="rh-form-error-box">
        <div className="rh-form-entry terms">
          <input
            type="checkbox"
            id="rh-terms"
            {...register('termsAndConditions')}
          />
          <label htmlFor="rh-terms">Terms and Conditions</label>
        </div>
        <div className="rh-form-error-message">
          {errors.termsAndConditions?.message}
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReactHookForm;
