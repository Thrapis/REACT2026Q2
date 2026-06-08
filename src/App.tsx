import { useState } from 'react';

import Modal from '@/components/Modal/Modal';
import UncontrolledForm from '@/components/UncontrolledForm/UncontrolledForm';

import './App.css';
import { useFormStore } from './stores/FormStore';
import SumbittedFormCard from './components/SumbittedFormCard/SumbittedFormCard';
import ReactHookForm from './components/ReactHookForm/ReactHooKForm';

const App = () => {
  const { forms } = useFormStore();
  const [openUModal, setOpenUModal] = useState<boolean>(false);
  const [openRHModal, setOpenRHModal] = useState<boolean>(false);

  return (
    <>
      <header className="header">
        <button onClick={() => setOpenUModal(true)}>
          Open Uncontrolled Modal
        </button>
        <button onClick={() => setOpenRHModal(true)}>
          Open React Hook Form Modal
        </button>
      </header>
      <main className="main">
        <div className="forms-container">
          {forms.map((f, i) => (
            <SumbittedFormCard key={i} data={f} />
          ))}
        </div>
      </main>
      {openUModal && (
        <Modal onClose={() => setOpenUModal(false)}>
          <UncontrolledForm onClose={() => setOpenUModal(false)} />
        </Modal>
      )}
      {openRHModal && (
        <Modal onClose={() => setOpenRHModal(false)}>
          <ReactHookForm onClose={() => setOpenRHModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default App;
