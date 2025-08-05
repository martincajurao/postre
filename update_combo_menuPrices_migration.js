<<<<<<< HEAD
/**
 * Migration script to update Combo collection items in Firebase Realtime Database
 * to add large size values to menuPrices object based on MenuCategory collection.
 * 
 * This script fetches all combos and menu categories, updates each combo member's
 * menuPrices.large with the corresponding large price from MenuCategory by menuCode,
 * and writes back the updated combo data.
 * 
 * Usage: Run this script in a Node.js environment with Firebase Admin SDK configured.
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Adjust path as needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://postres-c30e4-default-rtdb.firebaseio.com' // Replace with your actual Firebase Realtime Database URL
});

const db = admin.database();

async function migrateComboMenuPricesLarge() {
  const comboRef = db.ref('Combo'); // Adjust collection path if different
  const menuCategoryRef = db.ref('MenuCategory'); // Adjust collection path if different

  const [comboSnapshot, menuCategorySnapshot] = await Promise.all([
    comboRef.once('value'),
    menuCategoryRef.once('value')
  ]);

  const combos = comboSnapshot.val();
  const menuCategories = menuCategorySnapshot.val();

  if (!combos) {
    console.log('No combos found.');
    return;
  }
  if (!menuCategories) {
    console.log('No menu categories found.');
    return;
  }

  // Flatten MenuCategory items by menuCode for quick lookup
  const menuItemsByCode = {};
  for (const categoryKey in menuCategories) {
    const categoryItems = menuCategories[categoryKey];
    for (const itemKey in categoryItems) {
      const item = categoryItems[itemKey];
      if (item.menuCode) {
        menuItemsByCode[item.menuCode] = item;
      }
    }
  }

  const updates = {};

  for (const comboKey in combos) {
    const combo = combos[comboKey];
    let updated = false;
    if (combo.members) {
      for (const memberKey in combo.members) {
        const member = combo.members[memberKey];
        if (member.menuPrices) {
          const menuItem = menuItemsByCode[member.menuCode];
          if (menuItem && menuItem.menuPrices && menuItem.menuPrices.large) {
            if (member.menuPrices.large !== menuItem.menuPrices.large) {
              member.menuPrices.large = menuItem.menuPrices.large;
              updated = true;
              console.log(`Updated large price for member ${member.menuName} in combo ${combo.name}`);
            }
          }
        }
      }
    }
    if (updated) {
      updates[comboKey] = combo;
    }
  }

  if (Object.keys(updates).length > 0) {
    await comboRef.update(updates);
    console.log('Migration completed with updates.');
  } else {
    console.log('No updates needed. Migration skipped.');
  }
}

migrateComboMenuPricesLarge()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
=======
/**
 * Migration script to update Combo collection items in Firebase Realtime Database
 * to add large size values to menuPrices object based on MenuCategory collection.
 * 
 * This script fetches all combos and menu categories, updates each combo member's
 * menuPrices.large with the corresponding large price from MenuCategory by menuCode,
 * and writes back the updated combo data.
 * 
 * Usage: Run this script in a Node.js environment with Firebase Admin SDK configured.
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Adjust path as needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://postres-c30e4-default-rtdb.firebaseio.com' // Replace with your actual Firebase Realtime Database URL
});

const db = admin.database();

async function migrateComboMenuPricesLarge() {
  const comboRef = db.ref('Combo'); // Adjust collection path if different
  const menuCategoryRef = db.ref('MenuCategory'); // Adjust collection path if different

  const [comboSnapshot, menuCategorySnapshot] = await Promise.all([
    comboRef.once('value'),
    menuCategoryRef.once('value')
  ]);

  const combos = comboSnapshot.val();
  const menuCategories = menuCategorySnapshot.val();

  if (!combos) {
    console.log('No combos found.');
    return;
  }
  if (!menuCategories) {
    console.log('No menu categories found.');
    return;
  }

  // Flatten MenuCategory items by menuCode for quick lookup
  const menuItemsByCode = {};
  for (const categoryKey in menuCategories) {
    const categoryItems = menuCategories[categoryKey];
    for (const itemKey in categoryItems) {
      const item = categoryItems[itemKey];
      if (item.menuCode) {
        menuItemsByCode[item.menuCode] = item;
      }
    }
  }

  const updates = {};

  for (const comboKey in combos) {
    const combo = combos[comboKey];
    let updated = false;
    if (combo.members) {
      for (const memberKey in combo.members) {
        const member = combo.members[memberKey];
        if (member.menuPrices) {
          const menuItem = menuItemsByCode[member.menuCode];
          if (menuItem && menuItem.menuPrices && menuItem.menuPrices.large) {
            if (member.menuPrices.large !== menuItem.menuPrices.large) {
              member.menuPrices.large = menuItem.menuPrices.large;
              updated = true;
              console.log(`Updated large price for member ${member.menuName} in combo ${combo.name}`);
            }
          }
        }
      }
    }
    if (updated) {
      updates[comboKey] = combo;
    }
  }

  if (Object.keys(updates).length > 0) {
    await comboRef.update(updates);
    console.log('Migration completed with updates.');
  } else {
    console.log('No updates needed. Migration skipped.');
  }
}

migrateComboMenuPricesLarge()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
>>>>>>> da5a3c9e965c5170c5b4f26b4e2306db06e1a973
