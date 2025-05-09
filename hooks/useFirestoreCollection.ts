import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  where,
  DocumentData,
  CollectionReference,
  WithFieldValue
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';

interface UseFirestoreCollectionProps {
  collectionPath: string;
  filterField?: string;
  filterValue?: string;
}

export function useFirestoreCollection<T extends DocumentData>({
  collectionPath,
  filterField,
  filterValue
}: UseFirestoreCollectionProps) {
  const [data, setData] = useState<Array<T & { id: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!collectionPath) {
      setData([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);

      let q;
      const collectionRef = collection(db, collectionPath);
      
      if (filterField && filterValue) {
        q = query(collectionRef, where(filterField, '==', filterValue));
      } else {
        q = query(collectionRef);
      }

      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Array<T & { id: string }>;

      setData(fetchedData);
    } catch (err) {
      console.error('Error fetching collection:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<T, 'id'>) => {
    if (!collectionPath) {
      throw new Error('Collection path is required');
    }
    
    try {
      setLoading(true);
      const collectionRef = collection(db, collectionPath);
      const docRef = await addDoc(collectionRef, item as DocumentData);
      
      // Update the data state with the new item
      const newItem = { id: docRef.id, ...item } as T & { id: string };
      setData(prev => [...prev, newItem]);
      
      return docRef.id;
    } catch (err) {
      console.error('Error adding document:', err);
      setError(err instanceof Error ? err : new Error('Failed to add item'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, updates: Partial<T>) => {
    if (!collectionPath) {
      throw new Error('Collection path is required');
    }
    
    try {
      setLoading(true);
      const docRef = doc(db, collectionPath, id);
      await updateDoc(docRef, updates as DocumentData);
      
      // Update the data state with the updated item
      setData(prev => 
        prev.map(item => 
          item.id === id ? { ...item, ...updates } : item
        )
      );
      
      return id;
    } catch (err) {
      console.error('Error updating document:', err);
      setError(err instanceof Error ? err : new Error('Failed to update item'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!collectionPath) {
      throw new Error('Collection path is required');
    }
    
    try {
      setLoading(true);
      const docRef = doc(db, collectionPath, id);
      await deleteDoc(docRef);
      
      // Update the data state by removing the deleted item
      setData(prev => prev.filter(item => item.id !== id));
      
      return id;
    } catch (err) {
      console.error('Error deleting document:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete item'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionPath, filterField, filterValue]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
    addItem,
    updateItem,
    deleteItem,
  };
}
