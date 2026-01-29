const { enhancedParsingForTest } = require('./enhanced_parser');

// Function to save a single reservation to Firebase
async function saveSingleReservationToFirebase(reservationData) {
  if (!reservationData) {
    throw new Error('No reservation data provided');
  }

  try {
    // Mock Firebase saving for testing purposes
    // In real implementation, replace with actual Firebase calls
    
    const mockFirebaseSave = {
      success: true,
      reservationId: `reservation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      data: reservationData
    };
    
    console.log(`✅ Saved reservation ${mockFirebaseSave.reservationId} for ${reservationData.resname}`);
    return mockFirebaseSave;
    
  } catch (error) {
    console.error('Error saving reservation:', error);
    throw new Error(`Failed to save reservation: ${error.message}`);
  }
}

// Function to parse multiple reservations from text and save all to Firebase
async function parseAndSaveMultipleReservations(text) {
  try {
    console.log('🔍 Starting multi-reservation parsing...');
    
    // Split the input text into individual reservation blocks
    // Look for common separators between reservations
    const reservationBlocks = splitIntoReservationBlocks(text);
    
    console.log(`📝 Found ${reservationBlocks.length} reservation blocks`);
    
    const results = [];
    const savedReservations = [];
    const failedReservations = [];
    
    // Process each reservation block
    for (let i = 0; i < reservationBlocks.length; i++) {
      const block = reservationBlocks[i].trim();
      if (!block) continue;
      
      console.log(`\n📋 Processing reservation ${i + 1}/${reservationBlocks.length}:`);
      console.log(`   Block: ${block.substring(0, 100)}...`);
      
      try {
        // Parse the reservation using enhanced parser
        const parsedReservation = enhancedParsingForTest(block);
        
        // Save to Firebase
        const saveResult = await saveSingleReservationToFirebase(parsedReservation);
        
        results.push({
          blockIndex: i,
          success: true,
          reservationId: saveResult.reservationId,
          parsedData: parsedReservation,
          savedData: saveResult.data,
          message: `Reservation ${i + 1} saved successfully`
        });
        
        savedReservations.push({
          id: saveResult.reservationId,
          customerName: parsedReservation.resname,
          contact: parsedReservation.contact,
          date: parsedReservation.resdate
        });
        
        console.log(`   ✅ Reservation ${i + 1} saved successfully (ID: ${saveResult.reservationId})`);
        
      } catch (error) {
        console.error(`   ❌ Failed to process reservation ${i + 1}:`, error.message);
        
        results.push({
          blockIndex: i,
          success: false,
          error: error.message,
          blockText: block,
          message: `Failed to process reservation ${i + 1}: ${error.message}`
        });
        
        failedReservations.push({
          blockIndex: i,
          error: error.message,
          blockText: block
        });
      }
    }
    
    // Return comprehensive results
    return {
      success: true,
      totalProcessed: reservationBlocks.length,
      successful: savedReservations.length,
      failed: failedReservations.length,
      savedReservations: savedReservations,
      failedReservations: failedReservations,
      results: results,
      summary: `Processed ${reservationBlocks.length} reservations: ${savedReservations.length} successful, ${failedReservations.length} failed`
    };
    
  } catch (error) {
    console.error('Error in parseAndSaveMultipleReservations:', error);
    return {
      success: false,
      error: error.message,
      totalProcessed: 0,
      successful: 0,
      failed: 0,
      savedReservations: [],
      failedReservations: [],
      results: []
    };
  }
}

// Helper function to split text into individual reservation blocks
function splitIntoReservationBlocks(text) {
  // Common separators between reservations
  const separators = [
    /\n\s*---+\s*\n/,  // Dashes separator
    /\n\s*\*\*\*+\s*\n/,  // Asterisks separator
    /\n\s*={3,}\s*\n/,  // Equals separator
    /\n\s*Reservation\s+\d+[:\s]\s*\n/i,  // "Reservation X:" header
    /\n\s*Order\s+\d+[:\s]\s*\n/i,  // "Order X:" header
    /\n\s*Customer\s+\d+[:\s]\s*\n/i,  // "Customer X:" header
    /\n\s*\n\s*\n/  // Double line breaks (empty line separation)
  ];
  
  let blocks = [text];
  
  // Try each separator pattern
  for (const separator of separators) {
    const newBlocks = [];
    blocks.forEach(block => {
      const splitBlocks = block.split(separator);
      if (splitBlocks.length > 1) {
        newBlocks.push(...splitBlocks);
      } else {
        newBlocks.push(block);
      }
    });
    blocks = newBlocks;
  }
  
  // Filter out empty blocks and trim
  return blocks
    .map(block => block.trim())
    .filter(block => block.length > 10); // Minimum length for a valid reservation
}

// Function to parse multiple reservations without saving (for testing)
function parseMultipleReservations(text) {
  try {
    console.log('🔍 Parsing multiple reservations...');
    
    const reservationBlocks = splitIntoReservationBlocks(text);
    console.log(`📝 Found ${reservationBlocks.length} reservation blocks`);
    
    const results = [];
    
    for (let i = 0; i < reservationBlocks.length; i++) {
      const block = reservationBlocks[i].trim();
      if (!block) continue;
      
      try {
        const parsedReservation = enhancedParsingForTest(block);
        
        results.push({
          blockIndex: i,
          success: true,
          parsedData: parsedReservation,
          message: `Reservation ${i + 1} parsed successfully`
        });
        
        console.log(`   ✅ Reservation ${i + 1} parsed successfully`);
        
      } catch (error) {
        console.error(`   ❌ Failed to parse reservation ${i + 1}:`, error.message);
        
        results.push({
          blockIndex: i,
          success: false,
          error: error.message,
          blockText: block,
          message: `Failed to parse reservation ${i + 1}: ${error.message}`
        });
      }
    }
    
    return {
      success: true,
      totalProcessed: reservationBlocks.length,
      results: results,
      summary: `Parsed ${results.filter(r => r.success).length}/${reservationBlocks.length} reservations successfully`
    };
    
  } catch (error) {
    console.error('Error in parseMultipleReservations:', error);
    return {
      success: false,
      error: error.message,
      totalProcessed: 0,
      results: []
    };
  }
}

// Test function with multiple reservations
async function testMultipleReservations() {
  const testText = `Name: John Doe
Contact: 09171234567
Delivery to: 123 Main St, Cebu City
Date: June 1 (8:30AM)
- 2x Pancit Bam-i
- 1x Mango Crepe
Total: ₱2,420

---

Name: Maria Santos
#: 09551234567
Delivery to: 456 Oak Ave, Lahug
June 15 (2:00PM)
1x Pancit Canton
1x Leche Flan
Total: ₱1,850

***

Anna Reyes
09181234567
789 Pine St
June 20 10:00AM
3x Pancit
₱750`;

  console.log('🧪 Testing multi-reservation parsing and saving...\n');
  
  try {
    // First test parsing only
    console.log('📝 Testing parsing only:');
    const parseResults = parseMultipleReservations(testText);
    console.log(`Parsing Results: ${parseResults.summary}\n`);
    
    // Then test parsing and saving
    console.log('💾 Testing parsing and saving:');
    const saveResults = await parseAndSaveMultipleReservations(testText);
    
    if (saveResults.success) {
      console.log('\n🎉 Multi-reservation test completed successfully!');
      console.log(`📊 Summary: ${saveResults.summary}`);
      console.log(`✅ Saved reservations: ${saveResults.savedReservations.length}`);
      console.log(`❌ Failed reservations: ${saveResults.failedReservations.length}`);
      
      if (saveResults.savedReservations.length > 0) {
        console.log('\n📋 Saved Reservation IDs:');
        saveResults.savedReservations.forEach((res, index) => {
          console.log(`   ${index + 1}. ${res.id} - ${res.customerName} (${res.contact})`);
        });
      }
      
      if (saveResults.failedReservations.length > 0) {
        console.log('\n❌ Failed Reservations:');
        saveResults.failedReservations.forEach((res, index) => {
          console.log(`   ${index + 1}. Block ${res.blockIndex + 1}: ${res.error}`);
        });
      }
    } else {
      console.error('❌ Multi-reservation test failed:', saveResults.error);
    }
    
    return saveResults;
  } catch (error) {
    console.error('❌ Error in testMultipleReservations:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  saveSingleReservationToFirebase,
  parseAndSaveMultipleReservations,
  parseMultipleReservations,
  splitIntoReservationBlocks,
  testMultipleReservations
};

// Run test if called directly
if (require.main === module) {
  testMultipleReservations();
}
