
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Make sure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://postres-c30e4-default-rtdb.firebaseio.com'
});

const db = admin.database();

async function getAllMenuNames() {
  try {
    const menuNames = new Set();

    // Fetch from /Menu path
    const menuRef = db.ref('Menu');
    const menuSnapshot = await menuRef.once('value');
    const menuItems = menuSnapshot.val();

    if (menuItems) {
      for (const menuCode in menuItems) {
        if (menuItems[menuCode].menuName) {
          menuNames.add(menuItems[menuCode].menuName);
        }
      }
    }

    // Fetch from /MenuCategory path
    const menuCategoryRef = db.ref('MenuCategory');
    const menuCategorySnapshot = await menuCategoryRef.once('value');
    const menuCategories = menuCategorySnapshot.val();

    if (menuCategories) {
      for (const categoryKey in menuCategories) {
        const categoryItems = menuCategories[categoryKey];
        for (const menuCode in categoryItems) {
          if (categoryItems[menuCode].menuName) {
            menuNames.add(categoryItems[menuCode].menuName);
          }
        }
      }
    }

    console.log('--- Full List of Menu Names ---');
    if (menuNames.size === 0) {
      console.log('No menu names found.');
    } else {
      Array.from(menuNames).sort().forEach(name => console.log(name));
    }
    console.log('-------------------------------');

  } catch (error) {
    console.error('Error fetching menu names:', error);
  }
  process.exit(); // Exit the process after execution
}

getAllMenuNames();
