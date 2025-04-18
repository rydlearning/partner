import React, { useState } from "react";

interface AgeDropdownProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const AgeDropdown: React.FC<AgeDropdownProps> = ({
  defaultValue,
  onChange,
}) => {
  const [selectedAge, setSelectedAge] = useState(defaultValue);

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAge(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="relative">
      <select
        className="text-xs font-light border border-[#DADCE0] px-3 py-3 rounded-lg w-full mt-3"
        value={selectedAge}
        onChange={handleAgeChange}>
        <option value="0">Select Age</option>
        <option value="7">7</option>
        <option value="8">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
      </select>
    </div>
  );
};

export default AgeDropdown;
