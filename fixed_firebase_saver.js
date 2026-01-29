// Fixed Firebase saver that uses accurate date/time parsing

const { enhancedDateTimeParsing } = require('./enhanced_date_time_parser');

// Fixed date formatting for Firebase that preserves time
function formatDateForFirebaseWithTime(dateTime) {
  if (!dateTime || !(dateTime instanceof Date)) {
    // Return null or throw error instead of current date
    console.error('No valid date/time provided to formatDateForFirebaseWithTime');
    return null;
  }
  
  // Return the exact date/time including hours and minutes
  return dateTime.toISOString().slice(0, 19).replace('T', ' ');
}

// Fixed function to format data for Firebase using accurate date/time
function formatForFirebaseFixed(parsedData) {
  if (!parsedData) {
    throw new Error('No parsed data provided');
  }

  // Use the enhanced parser to get accurate date/time
  const enhanced = enhancedDateTimeParsing(parsedData.originalText || '');
  
  return {
    resname: parsedData.name || enhanced.name,
    contact: parsedData.contact || enhanced.contact,
    address: parsedData.address || enhanced.address,
    resdate: formatDateForFirebaseWithTime(enhanced.fullDate),
    total: parsedData.total || enhanced.total,
    order: (parsedData.items || enhanced.items).map((item, index) => ({
      id: `item_${index}_${Date.now()}`,
      buyQty: item.quantity,
      menuName: item.name,
      price: Math.round((parsedData.total || enhanced.total) / (parsedData.items || enhanced.items).length),
      selectedSize: 'medium'
    })),
    createdAt: new Date().toISOString()
  };
}

// Fixed save to Firebase with accurate date/time
async function saveReservationToFirebaseFixed(parsedData) {
  if (!parsedData) {
    throw new Error('No parsed data provided');
  }

  try {
    // Mock Firebase saving for testing purposes
    // In real implementation, replace with actual Firebase calls
    
    const mockFirebaseSave = {
      success: true,
      reservationId: `mock_${Date.now()}`,
      data: formatForFirebaseFixed(parsedData)
    };
    
    return mockFirebaseSave;
    
  } catch (error) {
    console.error('Error saving reservation:', error);
    throw new Error(`Failed to save reservation: ${error.message}`);
  }
}

// Fixed parse and save function
async function parseAndSaveReservationFixed(text) {
  try {
    // Parse the text using enhanced parser
    const parsedData = enhancedDateTimeParsing(text);
    
    // Add original text for reference
    parsedData.originalText = text;
    
    // Format and save to Firebase
    const result = await saveReservationToFirebaseFixed(parsedData);
    
    return {
      success: true,
      reservationId: result.reservationId,
      data: parsedData,
      savedData: result.data,
      message: 'Reservation saved successfully with accurate date/time'
    };
  } catch (error) {
    console.error('Error in parseAndSaveReservationFixed:', error);
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
}

// Test function to verify the fix
async function testFirebaseFix() {
  const testText = `Name: John Doe
Contact: 09171234567
Delivery to: 123 Main St, Cebu City
Date: June 25 (3:30PM)
- 2x Pancit Bam-i
- 1x Mango Crepe
Total: ₱2,420`;

  console.log('Testing fixed Firebase saving...');
  
  try {
    const result = await parseAndSaveReservationFixed(testText);
    
    if (result.success) {
      console.log('✅ Successfully parsed and formatted for Firebase!');
      console.log('Parsed date/time:', result.data.fullDate);
      console.log('Saved date/time:', result.savedData.resdate);
      console.log('Expected: June 25, 2025 3:30 PM');
      console.log('Reservation ID:', result.reservationId);
    } else {
      console.error('❌ Failed:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  formatDateForFirebaseWithTime,
  formatForFirebaseFixed,
  saveReservationToFirebaseFixed,
  parseAndSaveReservationFixed,
  testFirebaseFix
};

// Run test if called directly
if (require.main === module) {
  testFirebaseFix();
}
