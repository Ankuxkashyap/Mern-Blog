import React from "react";
import { BsXLg } from "react-icons/bs";

export const Tag = ({ tag, onRemove }) => {
    
  return (
    <span className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 text-black rounded-full text-sm font-medium mr-2 mb-2">
      {tag}
      <button
        type="button"
        onClick={onRemove}
        className="ml-2 text-gray-500 hover:text-red-600 transition-colors"
      >
        <BsXLg size={12} />
      </button>
    </span>
  );
};
