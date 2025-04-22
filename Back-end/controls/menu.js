const Menu = require("../models/menuSchema");
const MenuItem = require("../models/menuItemSchema");

// Fetch items for a specific menu
async function fetchMenuItems(req, res) {
  try {
    const menuId = req.params.menuId;
    // console.log("Menu ID:", menuId);

    const currentMenu = await Menu.findById(menuId).populate("items");
    if (!currentMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    const menuItems = currentMenu.items;
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: "No items found in this menu" });
    }

    return res.status(200).json({
      menuItems: menuItems,
      description: currentMenu.description,
    });
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching menu items" });
  }
}

// Create a new menu
async function addNewMenu(req, res) {
  try {
    const value = req.body.data;

    if (!value.menuDetails) {
      const newItem = await MenuItem.create(value);
      let response = await Menu.findByIdAndUpdate(
        value.menu,
        { $push: { items: newItem._id } },
        { new: true }
      );

      if (response) {
        return res.status(201).json({message: "Item created successfully",menu: newItem});
      }

    } else {
      let details = value.menuDetails;
      const newMenu = await Menu.create(details);

      if (newMenu) {
        value.menu.menu = newMenu._id;
        let data = value.menu;

        const newItem = await MenuItem.create(data);
        let menuId = newMenu._id;

        let response = await Menu.findByIdAndUpdate(
          menuId,
          { $push: { items: newItem._id } },
          { new: true }
        );
        if (response) {
          return res.status(201).json({message: "Menu created successfully",menu: response});
        }
      }
    }
  } catch (error) {
    console.error("Error creating menu:", error.message);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the menu" });
  }
}

// Fetch all menus
async function fetchAllMenus(req, res) {
  try {
    const allMenus = await Menu.find();
    if (!allMenus || allMenus.length === 0) {
      return res.status(404).json({ message: "No menus found" });
    }

    return res.status(200).json(allMenus);
  } catch (error) {
    console.error("Error fetching all menus:", error.message);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching menus" });
  }
}

module.exports = {
  fetchMenuItems,
  addNewMenu,
  fetchAllMenus,
};
