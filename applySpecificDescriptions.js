
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Make sure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://postres-c30e4-default-rtdb.firebaseio.com'
});

const db = admin.database();

const menuDescriptions = {
  "Beef Steak": "Tender, Savory, Juicy",
  "Buttered Chicken": "Creamy, Mild, Comforting",
  "Calamares": "Crispy, Golden, Ocean-fresh",
  "Carbonara": "Rich, Creamy, Smoky",
  "Chicken Buffalo": "Spicy, Tangy, Crunchy",
  "Chicken Fillet": "Lean, Crisp, Flavorful",
  "Chopsuey": "Colorful, Crunchy, Healthy",
  "Fish Fillet": "Light, Crispy, Delicate",
  "Fried Chicken": "Crispy, Juicy, Classic",
  "Kinilaw": "Fresh, Zesty, Chilled",
  "Lechon Belly": "Crispy, Savory, Succulent",
  "Mango Crepe (L)": "Lush, Fruity, Indulgent",
  "Mango Crepe (M)": "Sweet, Soft, Refreshing",
  "Mango Crepe (S)": "Light, Tropical, Creamy",
  "Mixed Vegetables": "Fresh, Nutritious, Vibrant",
  "Palabok": "Saucy, Garlicky, Hearty",
  "Pancit Bam-i": "Noodly, Savory, Balanced",
  "Pork Caldereta": "Rich, Hearty, Spiced",
  "Pork Honey Glazed": "Sweet, Tender, Glazed",
  "Pork Rebozdo": "Crunchy, Zesty, Golden",
  "Pork Spare Ribs": "Meaty, Smoky, Saucy",
  "Pork Steak": "Juicy, Bold, Umami",
  "Scallops": "Buttery, Delicate, Seared",
  "Spaghetti": "Saucy, Cheesy, Classic",
  "Sweet & Sour Fish": "Tangy, Crisp, Flavorful",
  "Sweet & Sour Shrimp": "Bright, Juicy, Bold",
  "Tempura": "Light, Crispy, Elegant"
};

async function applySpecificDescriptions() {
  try {
    // Update /Menu path
    const menuRef = db.ref('Menu');
    const menuSnapshot = await menuRef.once('value');
    const menuItems = menuSnapshot.val();
    const menuUpdates = {};

    if (menuItems) {
      for (const menuCode in menuItems) {
        const item = menuItems[menuCode];
        if (item.menuName && menuDescriptions[item.menuName]) {
          menuUpdates[`${menuCode}/menuDesc`] = menuDescriptions[item.menuName];
        }
      }
      if (Object.keys(menuUpdates).length > 0) {
        await menuRef.update(menuUpdates);
        console.log('Successfully updated descriptions in /Menu path.');
      } else {
        console.log('No descriptions to update in /Menu path.');
      }
    } else {
      console.log('No items found in /Menu path.');
    }

    // Update /MenuCategory path
    const menuCategoryRef = db.ref('MenuCategory');
    const menuCategorySnapshot = await menuCategoryRef.once('value');
    const menuCategories = menuCategorySnapshot.val();
    const menuCategoryUpdates = {};

    if (menuCategories) {
      for (const categoryKey in menuCategories) {
        const categoryItems = menuCategories[categoryKey];
        for (const menuCode in categoryItems) {
          const item = categoryItems[menuCode];
          if (item.menuName && menuDescriptions[item.menuName]) {
            menuCategoryUpdates[`${categoryKey}/${menuCode}/menuDesc`] = menuDescriptions[item.menuName];
          }
        }
      }
      if (Object.keys(menuCategoryUpdates).length > 0) {
        await menuCategoryRef.update(menuCategoryUpdates);
        console.log('Successfully updated descriptions in /MenuCategory path.');
      } else {
        console.log('No descriptions to update in /MenuCategory path.');
      }
    } else {
      console.log('No categories found in /MenuCategory path.');
    }

    console.log('Description update process completed.');

  } catch (error) {
    console.error('Error applying specific descriptions:', error);
  }
  process.exit(); // Exit the process after execution
}

applySpecificDescriptions();
