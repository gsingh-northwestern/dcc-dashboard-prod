import fs from 'fs';
import path from 'path';

const sourceFile = path.join(__dirname, '../../../database_1.js');
const targetFile = path.join(__dirname, './initDb.ts');

try {
  // Read the source file
  const sourceContent = fs.readFileSync(sourceFile, 'utf8');
  
  // Extract the recommendations array
  const recommendationsMatch = sourceContent.match(/const FULL_RECOMMENDATIONS_LIST_FOR_SEEDING = (\[[\s\S]*?\]);/);
  
  if (!recommendationsMatch) {
    throw new Error('Could not find recommendations data in source file');
  }
  
  const recommendationsData = recommendationsMatch[1];
  
  // Read the target file
  let targetContent = fs.readFileSync(targetFile, 'utf8');
  
  // Replace the placeholder with the actual data
  targetContent = targetContent.replace(
    /const FULL_RECOMMENDATIONS_LIST_FOR_SEEDING: Recommendation\[\] = \[\s*\/\/ Your recommendations data will be imported here\s*\];/,
    `const FULL_RECOMMENDATIONS_LIST_FOR_SEEDING: Recommendation[] = ${recommendationsData};`
  );
  
  // Write the updated content back to the target file
  fs.writeFileSync(targetFile, targetContent);
  
  console.log('Successfully copied recommendations data to initDb.ts');
} catch (error) {
  console.error('Error copying data:', error);
} 