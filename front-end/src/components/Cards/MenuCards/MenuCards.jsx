import { useContext, useEffect, useState } from "react";
import cocktail from "../../../assets/images/cocktail.png";
import drinks from "../../../assets/images/drinks.png";
import menuBanner from "../../../assets/images/menuBanner.png";
import menuRightBanner from "../../../assets/images/menuRightside.png";
import sideBanner from "../../../assets/images/menuLeftside.png";
import { GlobalContext } from "../../UseContext/GlobalProvider";

const MenuPreview = () => {
  const [display, setDisplay] = useState([]); 
  const context = useContext(GlobalContext);
  const { items } = context;

  useEffect(() => {
    const menuItems = items?.menuItems || []; 
    setDisplay(menuItems);
  }, [items]);

  return (
    <div
      className="p-1 flex bg-cover bg-center sm:h-[550px] w-full"
      style={{ backgroundImage: `url(${menuBanner})` }}
    >
      <div className="w-full h-full flex items-center justify-between">
        <img
          className="w-25 h-[85%] hidden sm:block"
          src={sideBanner}
          alt="Side Banner"
        />
        <div className="relative min-w-[80%] m-2 min-h-[300px] border border-white flex items-center justify-center">
          <img
            className="absolute w-[80px] h-[110px] top-[-20px] left-[0] sm:top-[-75px] sm:left-[-33px] sm:w-[110px] sm:h-[150px]"
            src={drinks}
            alt="Drinks"
          />
          <img
            className="absolute bottom-0 right-0 md:bottom-[-20px] md:right-[-8px] h-[100px] md:h-[150px]"
            src={cocktail}
            alt="Drinks"
          />
          <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="flex max-w-[200px] sm:max-w-[100%] gap-2 sm:gap-5 mx-7 justify-center items-center">
              <div className="h-[2px] w-[40px] md:w-[80px] bg-gray-400"></div>
              <h1 className="text-[30px] sm:text-[50px] text-center font-bold text-white OswaldFont RedTextShadow truncate max-w-[500px]">
                {items?.description || "Menu Description"}
              </h1>
              <div className="h-[2px] w-[40px] md:w-[80px] bg-gray-400"></div>
            </div>

            <div className="grid mb-[50px] gap-4 sm:gap-[60px] px-5 pt-8 pb-5 grid-cols-12 place-items-center">
              {display.length > 0 ? (
                display.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 col-span-12 sm:col-span-6 w-full max-w-[500px]"
                  >
                    <h1 className="text-white text-lg sm:text-2xl font-semibold">
                      {item.name} ............. ${item.price}
                    </h1>
                    <p className="text-sm sm:text-lg text-justify text-gray-600  max-w-full">
                      {item.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-white col-span-12 text-center">No items found</p>
              )}
            </div>
          </div>
        </div>

        <img
          className="hidden min-[640px]:block w-[50px] h-auto min-[700px]:w-[60px] min-[768px]:w-[80px] min-[1024px]:w-[100px] max-h-[85%] object-contain"
          src={menuRightBanner}
          alt="Right Banner"
        />
      </div>
    </div>
  );
};

export default MenuPreview;
