import React from 'react'; 

const InputBox = ({ name, type, placeholder, value, id, icons, onChange }) => {
  return (
    <div className="relative w-full mb-4 flex items-center justify-center">
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange} 
        className="w-[400px] rounded-md p-4 pl-[52px] bg-gray-100 border border-gray-300 focus:bg-transparent placeholder:text-black"
        required
      />

      <span className="absolute top-1/2 -translate-y-1/2 text-2xl text-gray-600 left-[18px] sm:hidden md:hidden">
        {icons}
      </span>
    </div>
  );
};

export default InputBox;
