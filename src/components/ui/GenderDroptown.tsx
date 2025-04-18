import React, { useState } from 'react';

interface GenderDropdownProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const GenderDropdown: React.FC<GenderDropdownProps> = ({ defaultValue, onChange }) => {
  const [selectedGender, setSelectedGender] = useState(defaultValue);

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="relative">
      <select
        className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
        value={selectedGender}
        onChange={handleGenderChange}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
};

export default GenderDropdown;
