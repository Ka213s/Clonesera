import React, { useState } from 'react';

interface SectionNamePopupProps {
  onClose: () => void;
  onSave: (sectionName: string) => void;
}

const SectionNamePopup: React.FC<SectionNamePopupProps> = ({ onClose, onSave }) => {
  const [sectionName, setSectionName] = useState('');

  const handleSave = () => {
    onSave(sectionName);
    setSectionName('');
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Enter Section Name</h2>
        <input
          type="text"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4"
        />
        <div className="flex justify-end">
          <button onClick={handleSave} className="px-4 py-2 bg-[#9997F5] text-white rounded-md mr-2">
            Save
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionNamePopup;