import type { SumbittedForm } from '@/types/SumbittedForm';

import './SumbittedFormCard.css';

interface SumbittedFormCardProps {
  data: SumbittedForm;
}

const SumbittedFormCard = ({ data }: SumbittedFormCardProps) => {
  return (
    <aside className="submitted-form-card">
      <div className="submitted-form-card-entry">
        <b>Name:</b> {data.name}
      </div>
      <div className="submitted-form-card-entry">
        <b>Age:</b> {data.age}
      </div>
      <div className="submitted-form-card-entry">
        <b>Email:</b> {data.email}
      </div>
      <div className="submitted-form-card-entry">
        <b>Gender:</b> {data.gender}
      </div>
      <div className="submitted-form-card-entry">
        <b>T&C:</b> {data.termsAndConditions ? 'Accepted' : 'Declined'}
      </div>
    </aside>
  );
};

export default SumbittedFormCard;
