import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "../../../Axios/Axios";
import { GlobalContext } from "../../UseContext/GlobalProvider";

const CreateMenu = ({ setOpenModal, setIsOpenModal, menu }) => {
  const [menuDetails, setmenuDetails] = useState({
    name: "",
    description: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const context = useContext(GlobalContext);
  const { setMenus } = context;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setmenuDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const handleSubmit = async () => {

    let formErrors = {};
    if (!menuDetails.name) formErrors.name = "Menu name is required";
    if (!menuDetails.description) formErrors.description = "Description is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; 
    }

    const data = {
      menu,
      menuDetails,
    };

    try {
      const response = await axios.post("/menu", { data });
      if (response) {
        setMenus((prev) => [...prev, response.data.menu]);
        setIsOpenModal(false);
        setOpenModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-screen z-10">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg relative">
          <button
            onClick={() => setOpenModal(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
          >
            <IoMdClose size={24} />
          </button>
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Add New Menu
          </h2>
          <form className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Menu Name
              </label>
              <input
                onChange={handleFormChange}
                id="name"
                name="name"
                type="text"
                required
                className="w-full border rounded-lg px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter menu name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                onChange={handleFormChange}
                id="description"
                name="description"
                required
                className="w-full border rounded-lg px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="Add a brief description"
                rows={4}
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 rounded-md bg-green-600 text-white py-2 px-4 hover:bg-green-500 transition w-full"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateMenu;
