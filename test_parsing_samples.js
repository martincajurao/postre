// Test cases for OpenAI parsing verification
const testCases = [
  {
    name: "Standard Order Format",
    input: `Name: John Doe
Contact: 09171234567
Delivery to: 123 Main St, Cebu City
Date: June 1 (8:30AM)
- 2x Pancit Bam-i
- 1x Mango Crepe
Total: ₱2,420
Special notes: Ring doorbell twice`,
    expected: {
      name: "John Doe",
      contact: "09171234567",
      address: "123 Main St, Cebu City",
      date: "June 1 8:30AM",
      items: [
        { name: "Pancit Bam-i", quantity: 2 },
        { name: "Mango Crepe", quantity: 1 }
      ],
      total: 2420,
      special_notes: "Ring doorbell twice"
    }
  },
  {
    name: "WhatsApp Style Format",
    input: `𝑵𝒂𝒎𝒆: Maria Santos
#: 09551234567
Delivery to: 456 Oak Ave, Lahug
June 15 (2:00PM)
1x Pancit Canton
1x Leche Flan
Total: ₱1,850
Please deliver to gate`,
    expected: {
      name: "Maria Santos",
      contact: "09551234567",
      address: "456 Oak Ave, Lahug",
      date: "June 15 2:00PM",
      items: [
        { name: "Pancit Canton", quantity: 1 },
        { name: "Leche Flan", quantity: 1 }
      ],
      total: 1850,
      special_notes: "Please deliver to gate"
    }
  },
  {
    name: "Minimal Format",
    input: `Anna Reyes
09181234567
789 Pine St
June 20 10:00AM
3x Pancit
₱750`,
    expected: {
      name: "Anna Reyes",
      contact: "09181234567",
      address: "789 Pine St",
      date: "June 20 10:00AM",
      items: [
        { name: "Pancit", quantity: 3 }
      ],
      total: 750
    }
  }
];

// Validation function to check parsing accuracy
function validateParsing(testCase, parsedResult) {
  const errors = [];
  
  // Check required fields
  if (!parsedResult.resname || parsedResult.resname === 'Customer') {
    errors.push('Name not properly extracted');
  }
  
  if (!parsedResult.contact) {
    errors.push('Contact not properly extracted');
  }
  
  if (!parsedResult.address) {
    errors.push('Address not properly extracted');
  }
  
  // Check date format
  const dateRegex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/;
  if (!dateRegex.test(parsedResult.resdate)) {
    errors.push('Date format incorrect');
  }
  
  // Check order items
  if (!parsedResult.order || parsedResult.order.length === 0) {
    errors.push('No order items found');
  } else {
    parsedResult.order.forEach(item => {
      if (!item.menuName || item.menuName === 'Unknown Item') {
        errors.push('Order item name not properly extracted');
      }
      if (!item.buyQty || item.buyQty <= 0) {
        errors.push('Order item quantity invalid');
      }
    });
  }
  
  return {
    testCase: testCase.name,
    errors,
    isValid: errors.length === 0,
    parsedResult
  };
}

module.exports = { testCases, validateParsing };
