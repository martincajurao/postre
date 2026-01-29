
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Make sure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://postres-c30e4-default-rtdb.firebaseio.com'
});

const db = admin.database();
const menuRef = db.ref('Menu');

async function updateMenuDescriptions() {
  try {
    const snapshot = await menuRef.once('value');
    const menuItems = snapshot.val();

    if (!menuItems) {
      console.log('No menu items found.');
      return;
    }

    const updates = {};
    const generatedDescriptions = new Set();

    for (const menuCode in menuItems) {
      const item = menuItems[menuCode];
      const menuName = item.menuName;
      const menuCategory = item.menuCategory;

      let newDescription = generateLiteralDescription(menuName, menuCategory, generatedDescriptions);

      updates[`${menuCode}/menuDesc`] = newDescription;
    }

    await menuRef.update(updates);
    console.log('Successfully updated menu descriptions!');

  } catch (error) {
    console.error('Error updating menu descriptions:', error);
  }
}

function generateLiteralDescription(menuName, menuCategory, generatedDescriptions) {
  let words = menuName.split(/[^a-zA-Z0-9]+/).filter(word => word.length > 0);
  let description = [];

  // Prioritize words from menuName
  for (let i = 0; i < words.length && description.length < 3; i++) {
    description.push(words[i]);
  }

  // Add category if description is too short
  if (description.length < 3 && menuCategory) {
    const categoryWords = menuCategory.split(/[^a-zA-Z0-9]+/).filter(word => word.length > 0);
    for (let i = 0; i < categoryWords.length && description.length < 3; i++) {
      description.push(categoryWords[i]);
    }
  }

  // Add generic words if still too short
  const genericWords = ['Dish', 'Meal', 'Special', 'Delight', 'Cuisine'];
  for (let i = 0; i < genericWords.length && description.length < 3; i++) {
    if (!description.includes(genericWords[i])) { // Avoid adding same generic word multiple times
      description.push(genericWords[i]);
    }
  }

  let finalDescription = description.slice(0, 3).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

  // Ensure uniqueness
  let counter = 1;
  let originalDescription = finalDescription;
  while (generatedDescriptions.has(finalDescription)) {
    finalDescription = `${originalDescription} ${counter++}`;
  }
  generatedDescriptions.add(finalDescription);

  return finalDescription;
}

updateMenuDescriptions();
