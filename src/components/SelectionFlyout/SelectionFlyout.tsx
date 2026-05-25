import { useSelectionStore } from '../../stores/Selection.store';

import './SelectionFlyout.css';

export default function SelectionFlyout() {
  const { characters, removeSelection, clearSelection } = useSelectionStore();

  return (
    <div
      className={`selection-flyout-container ${characters.length === 0 ? 'hidden' : ''}`}
    >
      <ul className="selection-flyout-list">
        {characters.map((selection) => (
          <li key={selection.id} className="selection-flyout-item">
            <span>{selection.name}</span>
            <button onClick={() => removeSelection(selection.id)}>X</button>
          </li>
        ))}
      </ul>
      <div className="selection-flyout-controls">
        <button>Download ({characters.length})</button>
        <button onClick={clearSelection}>Unselect All</button>
      </div>
    </div>
  );
}
