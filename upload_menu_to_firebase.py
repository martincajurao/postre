<<<<<<< HEAD
import firebase_admin
from firebase_admin import credentials, firestore
import json
from collections import defaultdict

# Path to your service account key file
SERVICE_ACCOUNT_KEY_PATH = 'C:/Users/Mizeri jiwu/Desktop/PostreWebsite/serviceAccountKey.json'
# Path to your menu_data.json file
MENU_DATA_PATH = 'C:/Users/Mizeri jiwu/Desktop/PostreWebsite/menu_data.json'
# Name of your Firestore collection for menu items
MENU_COLLECTION_NAME = 'Menu'
# Name of your Firestore collection for menu categories
CATEGORY_COLLECTION_NAME = 'MenuCategory'

def update_firestore_from_json():
    try:
        # Initialize Firebase Admin SDK
        cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("Firebase Admin SDK initialized successfully.")

        # Load menu_data.json
        with open(MENU_DATA_PATH, 'r', encoding='utf-8') as f:
            menu_data = json.load(f)
        print(f"Loaded data from {MENU_DATA_PATH}.")

        # Prepare data for MenuCategory collection
        category_items = defaultdict(list)
        for menu_code, item_data in menu_data.items():
            # Update Menu collection
            doc_ref = db.collection(MENU_COLLECTION_NAME).document(menu_code)
            doc_ref.set(item_data, merge=True)
            print(f"Updated document: {menu_code} in collection {MENU_COLLECTION_NAME}")

            # Collect menu codes for MenuCategory
            if 'menuCategory' in item_data:
                category_items[item_data['menuCategory']].append(menu_code)

        # Update MenuCategory collection
        for category_name, menu_codes in category_items.items():
            category_doc_ref = db.collection(CATEGORY_COLLECTION_NAME).document(category_name)
            # Use merge=True to avoid overwriting other fields in MenuCategory documents
            category_doc_ref.set({'items': menu_codes}, merge=True)
            print(f"Updated document: {category_name} in collection {CATEGORY_COLLECTION_NAME} with {len(menu_codes)} items.")

        print(f"Successfully updated Firestore collections '{MENU_COLLECTION_NAME}' and '{CATEGORY_COLLECTION_NAME}'.")

    except FileNotFoundError:
        print(f"Error: One of the files ({SERVICE_ACCOUNT_KEY_PATH} or {MENU_DATA_PATH}) was not found.")
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {MENU_DATA_PATH}. Please check file format.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    update_firestore_from_json()
=======
import firebase_admin
from firebase_admin import credentials, firestore
import json
from collections import defaultdict

# Path to your service account key file
SERVICE_ACCOUNT_KEY_PATH = 'C:/Users/Mizeri jiwu/Desktop/PostreWebsite/serviceAccountKey.json'
# Path to your menu_data.json file
MENU_DATA_PATH = 'C:/Users/Mizeri jiwu/Desktop/PostreWebsite/menu_data.json'
# Name of your Firestore collection for menu items
MENU_COLLECTION_NAME = 'Menu'
# Name of your Firestore collection for menu categories
CATEGORY_COLLECTION_NAME = 'MenuCategory'

def update_firestore_from_json():
    try:
        # Initialize Firebase Admin SDK
        cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("Firebase Admin SDK initialized successfully.")

        # Load menu_data.json
        with open(MENU_DATA_PATH, 'r', encoding='utf-8') as f:
            menu_data = json.load(f)
        print(f"Loaded data from {MENU_DATA_PATH}.")

        # Prepare data for MenuCategory collection
        category_items = defaultdict(list)
        for menu_code, item_data in menu_data.items():
            # Update Menu collection
            doc_ref = db.collection(MENU_COLLECTION_NAME).document(menu_code)
            doc_ref.set(item_data, merge=True)
            print(f"Updated document: {menu_code} in collection {MENU_COLLECTION_NAME}")

            # Collect menu codes for MenuCategory
            if 'menuCategory' in item_data:
                category_items[item_data['menuCategory']].append(menu_code)

        # Update MenuCategory collection
        for category_name, menu_codes in category_items.items():
            category_doc_ref = db.collection(CATEGORY_COLLECTION_NAME).document(category_name)
            # Use merge=True to avoid overwriting other fields in MenuCategory documents
            category_doc_ref.set({'items': menu_codes}, merge=True)
            print(f"Updated document: {category_name} in collection {CATEGORY_COLLECTION_NAME} with {len(menu_codes)} items.")

        print(f"Successfully updated Firestore collections '{MENU_COLLECTION_NAME}' and '{CATEGORY_COLLECTION_NAME}'.")

    except FileNotFoundError:
        print(f"Error: One of the files ({SERVICE_ACCOUNT_KEY_PATH} or {MENU_DATA_PATH}) was not found.")
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {MENU_DATA_PATH}. Please check file format.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    update_firestore_from_json()
>>>>>>> da5a3c9e965c5170c5b4f26b4e2306db06e1a973
