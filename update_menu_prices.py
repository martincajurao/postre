import json

file_path = 'C:/Users/Mizeri jiwu/Desktop/PostreWebsite/menu_data.json'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        menu_data = json.load(f)

    updated_menu_data = {}
    for menu_code, item_data in menu_data.items():
        if 'menuPrice' in item_data:
            try:
                # Ensure menuPrice is treated as a number for calculation
                base_price = float(item_data['menuPrice'])
                medium_price = str(base_price)
                large_price = str(round(base_price * 1.2)) # Example: 20% increase for large
            except ValueError:
                # Fallback if menuPrice is not a valid number
                medium_price = item_data['menuPrice']
                large_price = item_data['menuPrice'] # Or some default large price

            if 'menuPrices' not in item_data:
                item_data['menuPrices'] = {}
            
            # Ensure medium and large prices are set
            if 'medium' not in item_data['menuPrices']:
                item_data['menuPrices']['medium'] = medium_price
            if 'large' not in item_data['menuPrices']:
                item_data['menuPrices']['large'] = large_price
        
        updated_menu_data[menu_code] = item_data

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(updated_menu_data, f, indent=4)

    print(f"Successfully updated {file_path} with menuPrices for all items.")

except FileNotFoundError:
    print(f"Error: The file {file_path} was not found.")
except json.JSONDecodeError:
    print(f"Error: Could not decode JSON from {file_path}. Please check file format.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
