import { useRef, useState } from 'react';

import { useFormStore } from '@/stores/FormStore';
import { COUNTRIES } from '@/constants/Countries';
import { convertToBase64 } from '@/utils/ImageProcessing';
import { SumbittedFormSchema } from '@/schemas/SumbittedForm.schema';

import './UncontrolledForm.css';

interface UncontrolledFormProps {
  onClose: VoidFunction;
}

const UncontrolledForm = ({ onClose }: UncontrolledFormProps) => {
  const { addForm } = useFormStore();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (imageInputRef && imageInputRef.current) {
      const base64String = await convertToBase64(file);

      imageInputRef.current.value = base64String;
      const triggerEvent = new Event('input', { bubbles: true });
      imageInputRef.current.dispatchEvent(triggerEvent);
    }
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const entries = Object.fromEntries(data.entries());

    const formData = {
      name: String(entries.name),
      email: String(entries.email),
      age: Number(entries.age),
      gender: String(entries.gender),
      password: String(entries.password),
      confirmPassword: String(entries.confirmPassword),
      image: String(entries.image),
      country: String(entries.country),
      termsAndConditions: entries.termsAndConditions === 'on',
    };

    const result = SumbittedFormSchema.safeParse(formData);

    if (result.success) {
      addForm(result.data);
      onClose();
      return;
    }

    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      if (issue.path[0])
        formattedErrors[issue.path[0].toString()] = issue.message;
    });
    setFieldErrors(formattedErrors);
  };

  return (
    <form className="u-form" onSubmit={handleSubmit}>
      <div className="u-form-error-box">
        <div className="u-form-entry">
          <label htmlFor="u-name">Name:</label>
          <input type="text" id="u-name" name="name" />
        </div>
        <div className="u-form-error-message">{fieldErrors['name']}</div>
      </div>

      <div className="u-form-error-box">
        <div className="u-form-entry">
          <label htmlFor="u-email">Email:</label>
          <input type="email" id="u-email" name="email" />
        </div>
        <div className="u-form-error-message">{fieldErrors['email']}</div>
      </div>

      <div className="u-form-error-box">
        <div className="u-form-entry">
          <label htmlFor="u-age">Age:</label>
          <input type="number" id="u-age" name="age" />
        </div>
        <div className="u-form-error-message">{fieldErrors['age']}</div>
      </div>

      <div className="u-form-error-box">
        <div className="u-form-entry">
          <label htmlFor="u-gender">Gender:</label>
          <select id="u-gender" name="gender">
            <option>Unknown</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="u-form-error-message">{fieldErrors['gender']}</div>
      </div>

      <div className="u-form-error-box">
        <div className="u-form-entry">
          <label htmlFor="u-password">Password:</label>
          <input type="password" id="u-password" name="password" />
        </div>
        <div className="u-form-error-message">{fieldErrors['password']}</div>
      </div>

      <div className="u-form-error-box">
        <div className="u-form-entry">
          <label htmlFor="u-confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="u-confirm-password"
            name="confirmPassword"
          />
        </div>
        <div className="u-form-error-message">
          {fieldErrors['confirmPassword']}
        </div>
      </div>

      <div className="u-form-error-box">
        <div className="u-form-entry">
          <label htmlFor="u-image">Image:</label>
          <input type="hidden" name="image" ref={imageInputRef} />
          <input type="file" id="u-image" onChange={handleFileChange} />
        </div>
        <div className="u-form-error-message">{fieldErrors['image']}</div>
      </div>

      <datalist id="country-list">
        {COUNTRIES.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>

      <div className="u-form-error-box">
        <div className="u-form-entry">
          <label htmlFor="u-country">Country:</label>
          <input
            type="text"
            id="u-country"
            list="country-list"
            name="country"
          />
        </div>
        <div className="u-form-error-message">{fieldErrors['country']}</div>
      </div>

      <div className="u-form-error-box">
        <div className="u-form-entry terms">
          <input type="checkbox" id="u-terms" name="termsAndConditions" />
          <label htmlFor="u-terms">Terms and Conditions</label>
        </div>
        <div className="u-form-error-message">
          {fieldErrors['termsAndConditions']}
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
