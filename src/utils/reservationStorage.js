// Reservation storage utilities for saving parsed data
import { ref, push, set } from 'firebase/database';
import { db } from '@/firebase';

/**
 * Save parsed reservation data as a new reservation entry
 * @param {Object} parsedData - The parsed reservation data
 * @returns {Promise<Object>} - Result with success status and reservation ID
 */
export async function saveReservationEntry(parsedData) {
  if (!parsedData || typeof parsedData !== 'object') {
    throw new Error('Invalid parsed data provided');
  }

  try {
    // Validate required fields
    const requiredFields = ['name', 'contact', 'address', 'date', 'items', 'total'];
    const missingFields = requiredFields.filter(field => !parsedData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Format data for Firebase
    const reservationData = {
      customerName: parsedData.name,
      contact: parsedData.contact,
      deliveryAddress: parsedData.address,
      reservationDate: parsedData.date,
      partySize: parsedData.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 1,
      orderItems: parsedData.items || [],
      totalAmount: parsedData.total || 0,
      specialNotes: parsedData.special_notes || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to Firebase
    const reservationsRef = ref(db, 'reservations');
    const newReservationRef = push(reservationsRef);
    await set(newReservationRef, reservationData);

    return {
      success: true,
      reservationId: newReservationRef.key,
      data: reservationData
    };
  } catch (error) {
    console.error('Error saving reservation:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get all reservations from Firebase
 * @returns {Promise<Array>} - Array of reservation entries
 */
export async function getAllReservations() {
  try {
    const reservationsRef = ref(db, 'reservations');
    const snapshot = await get(reservationsRef);
    
    if (snapshot.exists()) {
      const reservations = [];
      snapshot.forEach((childSnapshot) => {
        reservations.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return reservations;
    }
    return [];
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
}

/**
 * Update reservation status
 * @param {string} reservationId - The reservation ID
 * @param {string} status - New status (pending, confirmed, completed, cancelled)
 * @returns {Promise<Object>} - Result with success status
 */
export async function updateReservationStatus(reservationId, status) {
  try {
    const reservationRef = ref(db, `reservations/${reservationId}`);
    await update(reservationRef, {
      status,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating reservation:', error);
    return { success: false, error: error.message };
  }
}
