// Test script to verify the Firebase date/time fix

const { parseAndSaveReservationFixed } = require('./fixed_firebase_saver');

async function testFirebaseFix() {
  console.log('🧪 Testing Firebase Date/Time Fix...\n');

  const testCases = [
    {
      name: "June 25 3:30PM",
      text: `Name: John Doe
Contact: 09171234567
Delivery to: 123 Main St, Cebu City
Date: June 25 (3:30PM)
- 2x Pancit Bam-i
- 1x Mango Crepe
Total: ₱2,420`
    },
    {
      name: "July 15 10:00AM",
      text: `Name: Maria Santos
Contact: 09551234567
Delivery to: 456 Oak Ave, Lahug
Date: July 15 (10:00AM)
1x Pancit Canton
1x Leche Flan
Total: ₱1,850`
    }
  ];

  for (const testCase of testCases) {
    console.log(`Testing: ${testCase.name}`);
    
    try {
      const result = await parseAndSaveReservationFixed(testCase.text);
      
      if (result.success) {
        console.log(`✅ SUCCESS: ${testCase.name}`);
        console.log(`   Saved date/time: ${result.data.fullDate}`);
        console.log(`   Expected: ${testCase.name}`);
        console.log(`   Reservation ID: ${result.reservationId}`);
      } else {
        console.log(`❌ FAILED: ${testCase.name} - ${result.error}`);
      }
      
    } catch (error) {
      console.log(`❌ ERROR: ${testCase.name} - ${error.message}`);
    }
    
    console.log('---');
  }
}

// Run the test
testFirebaseFix().catch(console.error);
