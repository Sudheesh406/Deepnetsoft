import { useCallback, useContext, useEffect, useState } from 'react';
import MenuBtn from './MenuBtn';
import CenterBanner from '../../../assets/images/centerBg.png';
import axios from '../../../Axios/Axios';
import { GlobalContext } from '../../UseContext/GlobalProvider';

const ButtonBanner = () => {
  const context = useContext(GlobalContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const { setItems, setMenus, menus } = context;

  const menuItemsFetch = useCallback(async (id) => {
    // console.log(id, "id received");
    try {
      const { data } = await axios.get(`/menu/${id}`);
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  }, [setItems]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get('/menu');
        setMenus(data);
        menuItemsFetch(data[0]._id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenu();
  }, [setMenus, menuItemsFetch]);

  return (
    <div
      style={{ backgroundImage: `url(${CenterBanner})` }}
      className="bg-cover bg-center"
    >
      <div className="container max-w-[1200px] min-h-10 mx-auto text-white flex justify-between items-baseline p-6 px-2">
        <div className="flex justify-center gap-4 w-full">
          {menus.length > 0 ? (
            menus.map((menu, index) => (
              <MenuBtn
                id={menu._id || ""}
                menuItemsFetch={menuItemsFetch}
                key={index}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                content={menu.name}
                index={index}
              />
            ))
          ) : (
            <p>Loading menus...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonBanner;
