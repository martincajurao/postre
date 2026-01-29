
// Enhanced parsing utilities for better OpenAI data matching

// Enhanced field extraction patterns
const fieldPatterns = {
  name: [
    /(?:name|𝑵𝒂𝒎𝒆|customer)[:\s]*([a-zA-Z\s]+?)(?=\n|contact|#|delivery|$)/i,
    /^([a-zA-Z\s]{3,50})(?=\n|contact|#|delivery|$)/m
  ],
  contact: [
    /(?:contact|#|phone)[:\s]*([0-9\s\-\+]{7,15})/i,
    /(?:^|\n)([0-9\s\-\+]{7,15})(?=\n|delivery|address|$)/m
  ],
  address: [
    /(?:delivery to|address|location)[:\s]*([^\n]+)/i,
    /(?:^|\n)([a-zA-Z0-9\s,\.#\-]{10,200})(?=\n|date|$)/m
  ],
  date: [
    /(?:date|time)[:\s]*([a-zA-Z]+\s+\d+(?:st|nd|rd|th)?\s*(?:\([^)]+\))?)/i,
    /([a-zA-Z]+\s+\d+(?:st|nd|rd|th)?\s*\([^)]+\))/i
  ],
  total: [
    /(?:total|amount)[:\s]*[₱P]?\s*([\d,]+)/i,
    /[₱P]\s*([\d,]+)(?=\n|$)/i
  ]
};

// Enhanced parsing function with better accuracy
function enhancedParsing(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('Invalid input text');
  }

  const result = {
    name: '',
    contact: '',
    address: '',
    date: '',
    items: [],
    total: 0,
    special_notes: ''
  };

  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
  // Extract name - first line if no label
  const nameMatch = text.match(/^(?:name|𝑵𝒂𝒎𝒆|customer)[:\s]*([a-zA-Z\s]+?)(?=\n|$)/i) ||
                   text.match(/^([a-zA-Z\s]{3,50})(?=\n|$)/m);
  result.name = nameMatch ? nameMatch[1].trim() : '';

  // Extract contact - look for phone pattern
  const contactMatch = text.match(/(?:contact|#|phone)[:\s]*([0-9\s\-\+]{7,15})/i) ||
                      text.match(/(?:^|\n)([0-9\s\-\+]{7,15})(?=\n|$)/m);
  result.contact = contactMatch ? contactMatch[1].trim() : '';

  // Extract address - after delivery/address keywords or look for address pattern
  const addressMatch = text.match(/(?:delivery to|address|location)[:\s]*([^\n]+)/i);
  if (addressMatch) {
    result.address = addressMatch[1].trim();
  } else {
    // For minimal format, look for address after contact (usually the third line)
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    if (lines.length >= 3) {
      // Check if third line looks like an address (contains street indicators)
      const thirdLine = lines[2];
      if (/[a-zA-Z0-9\s,\.#\-]{5,}/.test(thirdLine) && 
          !thirdLine.match(/^([a-zA-Z]+\s+\d+)/) && // Not a date
          !thirdLine.match(/^\d+x/) && // Not an item
          !thirdLine.match(/[₱P]/)) { // Not a price
        result.address = thirdLine;
      }
    }
  }

  // Extract date - look for date patterns more carefully
  let dateMatch = text.match(/(?:date|time)[:\s]*([a-zA-Z]+\s+\d+(?:st|nd|rd|th)?\s*(?:\([^)]+\))?)/i);
  if (!dateMatch) {
    // Look for date with time in parentheses
    dateMatch = text.match(/([a-zA-Z]+\s+\d+)\s*\((\d{1,2}:\d{2}[AP]M)\)/i);
    if (dateMatch) {
      result.date = dateMatch[1].trim() + ' (' + dateMatch[2].trim() + ')';
    } else {
      // Look for date with time without parentheses
      dateMatch = text.match(/([a-zA-Z]+\s+\d+\s+\d{1,2}:\d{2}[AP]M)/i);
      if (dateMatch) {
        result.date = dateMatch[1].trim();
      } else {
        // Look for simple date format
        dateMatch = text.match(/([a-zA-Z]+\s+\d+(?:st|nd|rd|th)?)/i);
        if (dateMatch) {
          result.date = dateMatch[1].trim();
        }
      }
    }
  } else {
    result.date = dateMatch[1].trim();
  }

  // Extract total
  const totalMatch = text.match(/(?:total|amount)[:\s]*[₱P]?\s*([\d,]+)/i) ||
                    text.match(/[₱P]\s*([\d,]+)(?=\n|$)/i);
  result.total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

  // Extract items - handle both formats
  const itemLines = text.split('\n').filter(line => 
    line.trim().startsWith('-') || 
    line.trim().startsWith('•') || 
    line.trim().startsWith('*') ||
    /^\d+x\s+/.test(line.trim())
  );
  
  itemLines.forEach(line => {
    const cleanLine = line.trim().replace(/^[-*•]\s*/, '');
    const itemMatch = cleanLine.match(/^(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?:\s*\([^)]*\))?(?:\s*$)/i);
    if (itemMatch) {
      const quantity = parseInt(itemMatch[1] || '1', 10);
      const name = itemMatch[2].trim();
      if (name && name.length > 1) {
        result.items.push({ name, quantity });
      }
    }
  });
  
  // Extract special notes from remaining content
  result.special_notes = extractSpecialNotes(text, result);
  
  return result;
}

// Helper function to extract fields using patterns
function extractField(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1] ? match[1].trim() : '';
    }
  }
  return '';
}

// Extract special notes from remaining content
function extractSpecialNotes(text, extractedFields) {
  // Remove extracted fields and items
  let remainingText = text;
  
  // Remove extracted fields
  Object.values(extractedFields).forEach(value => {
    if (typeof value === 'string' && value) {
      remainingText = remainingText.replace(value, '');
    }
  });
  
  // Remove items
  remainingText = remainingText.replace(/(?:^|\n)[\-\*•].*?(?:\n|$)/gm, '');
  
  // Remove common patterns
  remainingText = remainingText
    .replace(/(?:name|contact|address|date|total|delivery to)[:\s]*/gi, '')
    .replace(/[₱\d,]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
    
  return remainingText || '';
}

// Validation function for parsed data
function validateParsedData(parsedData) {
  const errors = [];
  
  // Validate required fields
  if (!parsedData.name || parsedData.name.length < 2) {
    errors.push('Invalid or missing customer name');
  }
  
  if (!isValidContact(parsedData.contact)) {
    errors.push('Invalid contact number format');
  }
  
  if (!parsedData.address || parsedData.address.length < 5) {
    errors.push('Invalid or missing delivery address');
  }
  
  if (!isValidDate(parsedData.date)) {
    errors.push('Invalid date format');
  }
  
  if (!parsedData.items || parsedData.items.length === 0) {
    errors.push('No order items found');
  } else {
    parsedData.items.forEach((item, index) => {
      if (!item.name || item.name.length < 2) {
        errors.push(`Invalid item name at position ${index + 1}`);
      }
      if (!item.quantity || item.quantity <= 0) {
        errors.push(`Invalid quantity for item ${item.name || 'unknown'}`);
      }
    });
  }
  
  if (parsedData.total <= 0) {
    errors.push('Invalid total amount');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    data: parsedData
  };
}

// Contact validation
function isValidContact(contact) {
  if (!contact) return false;
  const cleanContact = contact.replace(/\D/g, '');
  return cleanContact.length >= 7 && cleanContact.length <= 15;
}

// Date validation
function isValidDate(date) {
  if (!date) return false;
  const dateRegex = /[a-zA-Z]+\s+\d+(?:st|nd|rd|th)?\s*(?:\([^)]+\))?/;
  return dateRegex.test(date);
}

// Format data for Firebase
function formatForFirebase(parsedData) {
  const validation = validateParsedData(parsedData);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }
  
  return {
    resname: parsedData.name,
    contact: parsedData.contact,
    address: parsedData.address,
    resdate: formatDateForFirebase(parsedData.date),
    total: parsedData.total,
    order: parsedData.items.map((item, index) => ({
      id: `item_${index}_${Date.now()}`,
      buyQty: item.quantity,
      menuName: item.name,
      price: Math.round(parsedData.total / parsedData.items.length),
      selectedSize: 'medium'
    })),
    createdAt: new Date().toISOString()
  };
}

// Enhanced parsing function that returns data in the expected format for testing
function enhancedParsingForTest(text) {
  const parsedData = enhancedParsing(text);
  return formatForFirebase(parsedData);
}

// Date formatting for Firebase
function formatDateForFirebase(dateString) {
  // Parse natural language date
  const months = {
    'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
    'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
  };
  
  // Handle date with time format like "June 20 10:00AM"
  const dateTimeMatch = dateString.match(/([a-zA-Z]+)\s+(\d+)\s+(\d{1,2}):(\d{2})([AP]M)/i);
  if (dateTimeMatch) {
    const month = months[dateTimeMatch[1].toLowerCase()];
    const day = parseInt(dateTimeMatch[2], 10);
    let hour = parseInt(dateTimeMatch[3], 10);
    const minute = parseInt(dateTimeMatch[4], 10);
    const ampm = dateTimeMatch[5].toUpperCase();
    
    // Convert to 24-hour format
    if (ampm === 'PM' && hour !== 12) {
      hour += 12;
    } else if (ampm === 'AM' && hour === 12) {
      hour = 0;
    }
    
    const now = new Date();
    const year = now.getFullYear();
    
    return new Date(year, month, day, hour, minute).toISOString().slice(0, 19).replace('T', ' ');
  }
  
  // Handle date with time in parentheses like "June 1 (8:30AM)"
  const dateWithTimeMatch = dateString.match(/([a-zA-Z]+)\s+(\d+)\s*\((\d{1,2}):(\d{2})([AP]M)\)/i);
  if (dateWithTimeMatch) {
    const month = months[dateWithTimeMatch[1].toLowerCase()];
    const day = parseInt(dateWithTimeMatch[2], 10);
    let hour = parseInt(dateWithTimeMatch[3], 10);
    const minute = parseInt(dateWithTimeMatch[4], 10);
    const ampm = dateWithTimeMatch[5].toUpperCase();
    
    // Convert to 24-hour format
    if (ampm === 'PM' && hour !== 12) {
      hour += 12;
    } else if (ampm === 'AM' && hour === 12) {
      hour = 0;
    }
    
    const now = new Date();
    const year = now.getFullYear();
    
    return new Date(year, month, day, hour, minute).toISOString().slice(0, 19).replace('T', ' ');
  }
  
  // Handle simple date format like "June 15"
  const dateMatch = dateString.match(/([a-zA-Z]+)\s+(\d+)/i);
  if (dateMatch) {
    const month = months[dateMatch[1].toLowerCase()];
    const day = parseInt(dateMatch[2], 10);
    const now = new Date();
    const year = now.getFullYear();
    
    return new Date(year, month, day).toISOString().slice(0, 19).replace('T', ' ');
  }
  
  // Fallback to current date
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {
  enhancedParsing,
  enhancedParsingForTest,
  validateParsedData,
  formatForFirebase,
  fieldPatterns
};
