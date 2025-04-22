import React from "react";

const MenuBtn = ({ content, menuItemsFetch, currentIndex, setCurrentIndex, id, index }) => {

  return (
    <button
      onClick={() => {
        menuItemsFetch(id);
        setCurrentIndex(index);
      }}
      className={`border w-[80px] md:w-[120px] border-blue-400 rounded-sm text-sm md:text-lg font-md py-3 px-5 text-white ${
        currentIndex === index ? "bg-[#0796EF]" : "bg-black smRedTextShadow OswaldFont"
      }`}
    >
      {content}
    </button>
  );
};

export default MenuBtn;
