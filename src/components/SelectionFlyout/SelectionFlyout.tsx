import { useTheme } from '../../hooks/UseTheme';
import { useSelectionStore } from '../../stores/Selection.store';
import { convertToCSV, downloadFile } from '../../utils/FileHelper';

import './SelectionFlyout.css';

export default function SelectionFlyout() {
  const { theme } = useTheme();

  const { characters, removeSelection, clearSelection } = useSelectionStore();

  const handleDownload = () => {
    const csv = convertToCSV(characters);
    downloadFile(csv, `${characters.length}_items`);
  };

  return (
    <div
      className={`selection-flyout-container ${theme} ${characters.length === 0 ? 'hidden' : ''}`}
    >
      <ul className="selection-flyout-list">
        {characters.map((selection) => (
          <li key={selection.id} className="selection-flyout-item">
            <span className="selection-flyout-item-name">{selection.name}</span>
            <button onClick={() => removeSelection(selection.id)}>X</button>
          </li>
        ))}
      </ul>
      <div className="selection-flyout-controls">
        <button onClick={handleDownload}>Download ({characters.length})</button>
        <button onClick={clearSelection}>Unselect All</button>
      </div>
    </div>
  );
}
