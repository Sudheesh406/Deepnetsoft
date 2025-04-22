import { useState, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { GlobalContext } from "../../UseContext/GlobalProvider";
import CreateMenuItem from "../../Modals/MenuModals/CreateMenu";
import axios from "../../../Axios/Axios";

const CreateMenuItems = ({ setIsOpenModal }) => {
  const context = useContext(GlobalContext);
  const [openModal, setOpenModal] = useState(false);
  const { menus,setItems ,items } = context;

  console.log("menus", menus);
  const [menu, setMenu] = useState({
    name: "",
    description: "",
    price: "",
    menu: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    menu: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setMenu((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when field is changed
  };

  const HandleModal = () => {
    setIsOpenModal(false);
  };
console.log(items.menuItems)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!menu.name) formErrors.name = "Name is required";
    if (!menu.description) formErrors.description = "Description is required";
    if (!menu.price) formErrors.price = "Price is required";
    if (!menu.menu) formErrors.menu = "Menu selection is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; 
    }

    try {
      let data = menu;
      let response = await axios.post("/menu", { data });
      if (response) {
        console.log("response",response)
        setItems(prevItems => ({
          ...prevItems,
          menuItems: [...prevItems.menuItems, response.data.menu]
        }));
        
        setIsOpenModal(false);
      }
    } catch (error) {
      console.error("error found in handleSubmit", error);
    }
  };

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center z-50">
      <div className="max-w-[500px] w-full bg-white p-8 rounded-lg relative shadow-lg">
        <button
          onClick={HandleModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <IoMdClose size={20} />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Add Menu Items
        </h2>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleFormChange}
              className="w-full rounded-md border px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleFormChange}
              className="w-full rounded-md border px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-900 mb-1"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              onChange={handleFormChange}
              className="w-full rounded-md border px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          <div className="flex gap-4">
            <select
              id="menu"
              name="menu"
              onChange={(e) => {
                if (e.target.value === "__create_new__") {
                  setOpenModal(true);
                } else {
                  handleFormChange(e);
                }
              }}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Select a menu</option>
              {menus.length > 0 &&
                menus.map((elem, index) => (
                  <option key={index} value={elem._id}>
                    {elem.name}
                  </option>
                ))}
                <hr/>
              <option value="__create_new__" className="text-blue-600">+ Create New Menu</option>
            </select>
            {errors.menu && <p className="text-red-500 text-xs mt-1">{errors.menu}</p>}

            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 rounded-md bg-green-600 text-white py-2 px-4 hover:bg-green-500 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {openModal && <CreateMenuItem setOpenModal={setOpenModal} setIsOpenModal={setIsOpenModal} menu={menu} />}
    </div>
  );
};

export default CreateMenuItems;
