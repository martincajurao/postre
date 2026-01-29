// Example usage of the multi-reservation Firebase saver

const { parseAndSaveMultipleReservations, parseMultipleReservations } = require('./multi_reservation_firebase_saver');

// Example 1: Parse and save multiple reservations
async function example1() {
  console.log('=== Example 1: Parse and Save Multiple Reservations ===\n');
  
  const multipleReservationsText = `Name: John Doe
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

Name: Carlos Garcia
Contact: 09221234567
Delivery to: 789 Mango Ave, Mandaue
Date: June 25 (6:00PM)
- 1x Family Pack Pancit
- 2x Halo-Halo
Total: ₱3,200`;

  try {
    const results = await parseAndSaveMultipleReservations(multipleReservationsText);
    
    console.log('📊 Results Summary:');
    console.log(`   Total Processed: ${results.totalProcessed}`);
    console.log(`   Successful: ${results.successful}`);
    console.log(`   Failed: ${results.failed}`);
    console.log(`   Summary: ${results.summary}`);
    
    if (results.savedReservations.length > 0) {
      console.log('\n✅ Successfully Saved Reservations:');
      results.savedReservations.forEach((res, index) => {
        console.log(`   ${index + 1}. ID: ${res.id}`);
        console.log(`      Customer: ${res.customerName}`);
        console.log(`      Contact: ${res.contact}`);
        console.log(`      Date: ${res.date}`);
      });
    }
    
    if (results.failedReservations.length > 0) {
      console.log('\n❌ Failed Reservations:');
      results.failedReservations.forEach((res, index) => {
        console.log(`   ${index + 1}. Block ${res.blockIndex + 1}: ${res.error}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Example 2: Parse multiple reservations without saving (for validation)
async function example2() {
  console.log('\n=== Example 2: Parse Multiple Reservations (Validation Only) ===\n');
  
  const validationText = `Name: Test User 1
Contact: 09171111111
Delivery to: Test Address 1
Date: July 1 (10:00AM)
- 1x Test Item 1
Total: ₱500

***

Name: Test User 2
Contact: 09172222222
Delivery to: Test Address 2
July 15 (3:00PM)
2x Test Item 2
₱1,000`;

  try {
    const results = parseMultipleReservations(validationText);
    
    console.log('📊 Validation Results:');
    console.log(`   Total Processed: ${results.totalProcessed}`);
    console.log(`   Summary: ${results.summary}`);
    
    console.log('\n📋 Detailed Results:');
    results.results.forEach((result, index) => {
      if (result.success) {
        console.log(`   ✅ Reservation ${index + 1}: ${result.message}`);
        console.log(`      Customer: ${result.parsedData.resname}`);
        console.log(`      Items: ${result.parsedData.order.length}`);
        console.log(`      Total: ₱${result.parsedData.total}`);
      } else {
        console.log(`   ❌ Reservation ${index + 1}: ${result.message}`);
        console.log(`      Error: ${result.error}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run examples
async function runExamples() {
  await example1();
  await example2();
}

// Run if called directly
if (require.main === module) {
  runExamples();
}

module.exports = { example1, example2, runExamples };
