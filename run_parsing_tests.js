const { testCases, validateParsing } = require('./test_parsing_samples');
const { enhancedParsingForTest } = require('./enhanced_parser');

async function runTests() {
  console.log('🧪 Running Enhanced Parsing Tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  for (const testCase of testCases) {
    try {
      console.log(`📋 Test: ${testCase.name}`);
      console.log(`   Input: ${testCase.input.substring(0, 100)}...`);
      
      // Parse using enhanced parser
      const parsed = enhancedParsingForTest(testCase.input);
      const accuracy = validateParsing(testCase, parsed);
      
      console.log(`   Parsed Name: ${parsed.resname}`);
      console.log(`   Parsed Contact: ${parsed.contact}`);
      console.log(`   Parsed Address: ${parsed.address}`);
      console.log(`   Parsed Items: ${parsed.order.length}`);
      console.log(`   Parsed Total: ${parsed.total}`);
      
      if (accuracy.isValid) {
        console.log('   ✅ PASSED - All validations passed');
        passed++;
      } else {
        console.log('   ❌ FAILED - Issues found:');
        accuracy.errors.forEach(error => console.log(`      - ${error}`));
        failed++;
      }
      
      console.log('   ---');
      
    } catch (error) {
      console.error(`   ❌ EXCEPTION: ${error.message}`);
      failed++;
    }
  }
  
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  console.log(`📈 Accuracy Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
}

// Run the tests
runTests();
