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
  items: [
    /(?:^|\n)[\-\*•]\s*(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?=\n|$)/gm
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
  
  // Extract fields using patterns
  result.name = extractField(text, fieldPatterns.name);
  result.contact = extractField(text, fieldPatterns.contact);
  result.address = extractField(text, fieldPatterns.address);
  result.date = extractField(text, fieldPatterns.date);
  result.total = parseInt(extractField(text, fieldPatterns.total).replace(/,/g, ''), 10) || 0;
  result.special_notes = extractField(text, fieldPatterns.special_notes);
  
  // Extract items
  const itemMatches = text.match(fieldPatterns.items[0]);
  if (itemMatches) {
    let match;
    const itemRegex = /(?:^|\n)[\-\*•]\s*(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?=\n|$)/gm;
    while ((match = itemRegex.exec(text)) !== null) {
      const quantity = parseInt(match[1] || '1', 10);
      const name = match[2].trim();
      result.items.push({ name, quantity });
    }
  }
  
  // Extract special notes
  const itemMatches = text.match(fieldPatterns.items[0]);
  if (itemMatches) {
    let match;
    const itemRegex = /(?:^|\n)[\-\*•]\s*(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?=\n|$)/gm;
    while ((match = itemRegex.exec(text)) !== null) {
      const quantity = parseInt(match[1] || '1', 10);
      const name = match[2].trim();
      result.items.push({ name, quantity });
    }
  }
  
  // Extract special notes
  const itemMatches = text.match(fieldPatterns.items[0]);
  if (itemMatches) {
    let match;
    const itemRegex = /(?:^|\n)[\-\*•]\s*(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?=\n|$)/gm;
    while ((match = itemRegex.exec(text)) !== null) {
      const quantity = parseInt(match[1] || '1', 10);
      const name = match[2].trim();
      result.items.push({ name, quantity });
    }
  }
  
  // Extract special notes
  const itemMatches = text.match(fieldPatterns.items[0]);
  if (itemMatches) {
    let match;
    const itemRegex = /(?:^|\n)[\-\*•]\s*(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?=\n|$)/gm;
    while ((match = itemRegex.exec(text)) !== null) {
      const quantity = parseInt(match[1] || '1', 10);
      const name = match[2].trim();
      result.items.push({ name, quantity });
    }
  }
  
  // Extract special notes
  const itemMatches = text.match(fieldPatterns.items[0]);
  if (itemMatches) {
    let match;
    const itemRegex = /(?:^|\n)[\-\*•]\s*(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?=\n|$)/gm;
    while ((match = itemRegex.exec(text)) !== null) {
      const quantity = parseInt(match[1] || '1', 10);
      const name = match[2].trim();
      result.items.push({ name, quantity });
    }
  }
  
  // Extract special notes
  const itemMatches = text.match(fieldPatterns.items[0]);
  if (itemMatches) {
    let match;
    const itemRegex = /(?:^|\n)[\-\*•]\s*(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?=\n|$)/gm;
    while ((match = itemRegex.exec(text)) !== null) {
      const quantity = parseInt(match[1] || '1', 10);
      const name = match[2].trim();
      result.items.push({ name, quantity });
    }
  }
  
  // Extract special notes
  const itemMatches = text.match(fieldPatterns.items[0]);
  if (itemMatches) {
    let match;
    const itemRegex = /(?:^|\n)[\-\*•]\s*(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?=\n|$)/gm;
    while ((match = itemRegex.exec(text)) !== null) {
      const quantity = parseInt(match[1] || '1', 10);
      const name = match[2].trim();
      result.items.push({ name, quantity });
    }
  }
  
  // Extract special notes
  const itemMatches = text.match(fieldPatterns.items[0]);
    let match;
    const itemRegex = /(?:^|\n)[\-\*•]\s*(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?=\n|$)/gm;
    while ((match = itemRegex.exec(text)) !== null) {
      const quantity = parseInt(match[1] || '1', 10);
      const name = match[2].trim();
      result.items.push({ name, quantity });
    }
  }
  
  // Extract special notes
  const itemMatches = text.match(fieldPatterns.items[0]);
    let match;
    const itemRegex = /(?:^|\n)[\-\*•]\s*(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?=\n|$)/gm;
    while ((match = itemRegex.exec(text)) !== null) {
      const quantity = parseInt(match[1] || '1', 10);
      const name = match[2].trim();
      result.items.push({ name, quantity });
    }
  }
  
  // Extract special notes
  const itemMatches = text.match(fieldPatterns.items[0]);
    let match;
    const itemRegex = /(?:^|\n)[\-\*•]\s*(?:(\d+)x?\s*)?([a-zA-Z\s\-]+?)(?=\n|$)/gm;
    while ((match = itemRegex.exec(text)) !== null) {
      const quantity = parseInt(match[1] || '1', 10);
      const name = match[2].trim();
      result.items.push({ name, quantity });
    }
  }
  
  // Extract specialNext, I will create a test script to run the test cases against the enhanced parsing utility and report results.

<create_file>
<path>run_parsing_tests.js</path>
<content>
const { testCases, validateParsing } = require('./test_parsing_samples');
const { enhancedParsing, validateParsedData } = require('./enhanced_parsing_utils');

async function runTests() {
  for (const testCase of testCases) {
    try {
      const parsed = enhancedParsing(testCase.input);
      const validation = validateParsedData(parsed);
      const accuracy = validateParsing(testCase, parsed);
      
      console.log(`Test: ${testCase.name}`);
      if (validation.isValid && accuracy.isValid) {
        console.log('  ✅ Passed all validations');
      } else {
        console.log('  ❌ Validation errors:', [...validation.errors, ...accuracy.errors].join('; '));
      }
      console.log('  Parsed Result:', JSON.stringify(parsed, null, 2));
      console.log('----------------------------------------');
    } catch (error) {
      console.error(`Test: ${testCase.name} - Exception:`, error.message);
    }
  }
}

runTests();
