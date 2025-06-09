import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Recommendation {
  id: string;
  category: string;
  recommendation: string;
  sources: string[];
  sourceTags: string[];
  needTags: string[];
}

const FULL_RECOMMENDATIONS_LIST_FOR_SEEDING: Recommendation[] = [
  // Your recommendations data will be imported here
];

const initializeDatabase = async () => {
  try {
    const recommendationsCollection = collection(db, 'recommendations');
    
    for (const recommendation of FULL_RECOMMENDATIONS_LIST_FOR_SEEDING) {
      await addDoc(recommendationsCollection, recommendation);
    }
    
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default initializeDatabase; 