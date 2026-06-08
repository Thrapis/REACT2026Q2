import { useState } from 'react';
import Modal from '@/components/Modal/Modal';

import './App.css';

const App = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <header>
        <button onClick={() => setOpenModal(true)}>Open Modal</button>
      </header>
      <main>
        {openModal && (
          <Modal onClose={() => setOpenModal(false)}>
            <form>
              <input
                type="text"
                placeholder="Enter Text..."
                name="some-field"
              />
              <button type="submit">Submit</button>
            </form>
          </Modal>
        )}
      </main>
    </>
  );
};

export default App;
