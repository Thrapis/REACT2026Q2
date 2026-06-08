import { type SumbittedForm } from '@/types/SumbittedForm';
import { useFormStore } from '@/stores/FormStore';

import './UncontrolledForm.css';

interface UncontrolledFormProps {
  onClose: VoidFunction;
}

const UncontrolledForm = ({ onClose }: UncontrolledFormProps) => {
  const { addForm } = useFormStore();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const entries = Object.fromEntries(data.entries());

    const formData: SumbittedForm = {
      name: String(entries.name),
      email: String(entries.email),
      age: Number(entries.age),
      gender: String(entries.gender),
      termsAndConditions: entries.termsAndConditions === 'on',
    };

    addForm(formData);
    onClose();
  };

  return (
    <form className="u-form" onSubmit={handleSubmit}>
      <div className="u-form-entry">
        <label htmlFor="u-name">Name:</label>
        <input type="text" name="name" id="u-name" />
      </div>

      <div className="u-form-entry">
        <label htmlFor="u-email">Email:</label>
        <input type="email" name="email" id="u-email" />
      </div>

      <div className="u-form-entry">
        <label htmlFor="u-age">Age:</label>
        <input type="number" name="age" id="u-age" />
      </div>

      <div className="u-form-entry">
        <label htmlFor="u-gender">Gender:</label>
        <select name="gender" id="u-gender">
          <option>Unknown</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div className="u-form-entry terms">
        <input type="checkbox" name="termsAndConditions" id="u-terms" />
        <label htmlFor="u-terms">Terms and Conditions</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
