'use client';

import { useTranslations } from 'next-intl';

import { useSelectionStore } from '@/stores/Selection.store';

import './SelectionFlyout.css';
import { useState } from 'react';

export default function SelectionFlyout() {
  const t = useTranslations('SelectionFlyout');
  const [isDownloading, setIsDownloading] = useState(false);

  const { characters, removeSelection, clearSelection } = useSelectionStore();

  const handleDownload = async () => {
    if (characters.length === 0) return;

    setIsDownloading(true);
    try {
      const response = await fetch('/api/export-characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characters }),
      });

      if (!response.ok) throw new Error('Mlia, maslinu pajmal');

      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);

      const temporaryAnchorElement = document.createElement('a');
      temporaryAnchorElement.href = objectURL;
      temporaryAnchorElement.download = `${characters.length}_items.csv`;
      temporaryAnchorElement.style.display = 'none';

      document.body.append(temporaryAnchorElement);
      temporaryAnchorElement.click();
      temporaryAnchorElement.remove();

      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error('Failed to export CSV from server:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className={`selection-flyout-container ${characters.length === 0 ? 'hidden' : ''}`}
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
        <button onClick={handleDownload}>
          {isDownloading
            ? t('downloading')
            : `${t('download')} (${characters.length})`}
        </button>
        <button onClick={clearSelection}>{t('unselectAll')}</button>
      </div>
    </div>
  );
}
