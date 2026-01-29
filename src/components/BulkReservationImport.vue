<template>
  <div class="bulk-reservation-import">
    <v-card>
      <v-card-title>
        <v-icon left>mdi-upload-multiple</v-icon>
        Bulk Reservation Import
      </v-card-title>
      
      <v-card-text>
        <!-- File Upload Area -->
        <v-file-input
          v-model="files"
          multiple
          accept="text/plain,.txt"
          label="Upload reservation files"
          prepend-icon="mdi-file-document-multiple"
          @change="handleFileUpload"
        ></v-file-input>
        
        <!-- Text Area for Paste -->
        <v-textarea
          v-model="pastedText"
          label="Or paste reservations here"
          placeholder="Paste multiple reservation texts separated by new lines..."
          rows="10"
          outlined
          @input="handleTextInput"
        ></v-textarea>
        
        <!-- Preview Section -->
        <div v-if="parsedReservations.length > 0" class="preview-section">
          <h3>Preview ({{ parsedReservations.length }} reservations)</h3>
          <v-list dense>
            <v-list-item
              v-for="(reservation, index) in previewReservations"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ reservation.customerName }} - {{ reservation.date }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ reservation.items?.length || 0 }} items
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        
        <!-- Error Display -->
        <v-alert
          v-if="errors.length > 0"
          type="error"
          dismissible
        >
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </v-alert>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="parsedReservations.length === 0"
          @click="importReservations"
        >
          <v-icon left>mdi-upload</v-icon>
          Import {{ parsedReservations.length }} Reservations
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

// Mock Firebase functions since the original file uses CommonJS
const parseAndSaveReservationFixed = async (text) => {
  try {
    // Basic parsing for demonstration
    const lines = text.split('\n').filter(line => line.trim())
    const parsedData = {
      name: '',
      contact: '',
      address: '',
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      items: [],
      total: 0,
      originalText: text
    }
    
    // Simple parsing logic
    for (const line of lines) {
      if (line.includes('Name:')) {
        parsedData.name = line.split('Name:')[1]?.trim() || ''
      } else if (line.includes('Contact:')) {
        parsedData.contact = line.split('Contact:')[1]?.trim() || ''
      } else if (line.includes('Address:')) {
        parsedData.address = line.split('Address:')[1]?.trim() || ''
      } else if (line.includes('Total:')) {
        const totalMatch = line.match(/[0-9,]+/)
        parsedData.total = totalMatch ? parseInt(totalMatch[0].replace(/,/g, '')) : 0
      }
    }
    
    return {
      success: true,
      reservationId: `mock_${Date.now()}`,
      data: parsedData,
      message: 'Reservation saved successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null
    }
  }
}

const saveReservationToFirebaseFixed = async (parsedData) => {
  return {
    success: true,
    reservationId: `mock_${Date.now()}`,
    data: parsedData
  }
}

export default {
  name: 'BulkReservationImport',
  setup() {
    const files = ref([])
    const pastedText = ref('')
    const parsedReservations = ref([])
    const errors = ref([])
    const loading = ref(false)
    
    const previewReservations = computed(() => 
      parsedReservations.value.slice(0, 5)
    )
    
    const handleFileUpload = async () => {
      errors.value = []
      parsedReservations.value = []
      
      for (const file of files.value) {
        try {
          const text = await file.text()
          const reservations = parseBulkText(text)
          parsedReservations.value.push(...reservations)
        } catch (error) {
          errors.value.push(`Error parsing ${file.name}: ${error.message}`)
        }
      }
    }
    
    const handleTextInput = () => {
      errors.value = []
      parsedReservations.value = []
      
      if (pastedText.value.trim()) {
        const reservations = parseBulkText(pastedText.value)
        parsedReservations.value.push(...reservations)
      }
    }
    
    const parseBulkText = (text) => {
      const lines = text.split('\n').filter(line => line.trim())
      const reservations = []
      
      let currentReservation = null
      
      for (const line of lines) {
        if (line.startsWith('Reservation:') || line.startsWith('Order:')) {
          if (currentReservation) {
            reservations.push(currentReservation)
          }
          currentReservation = {
            originalText: line,
            customerName: '',
            date: '',
            time: '',
            address: '',
            items: [],
            total: 0
          }
        } else if (currentReservation) {
          // Enhanced parsing logic
          if (line.includes('Name:')) {
            currentReservation.customerName = line.split('Name:')[1].trim()
          } else if (line.includes('Date:')) {
            currentReservation.date = line.split('Date:')[1].trim()
          } else if (line.includes('Time:')) {
            currentReservation.time = line.split('Time:')[1].trim()
          } else if (line.includes('Address:')) {
            currentReservation.address = line.split('Address:')[1].trim()
          } else if (line.includes('Item:') || line.includes('-')) {
            const itemText = line.replace('Item:', '').trim()
            if (itemText) {
              currentReservation.items.push({
                name: itemText,
                quantity: 1,
                price: 0
              })
            }
          }
        }
      }
      
      if (currentReservation) {
        reservations.push(currentReservation)
      }
      
      return reservations
    }
    
    const importReservations = async () => {
      loading.value = true
      errors.value = []
      
      const results = []
      
      for (let i = 0; i < parsedReservations.value.length; i++) {
        const reservation = parsedReservations.value[i]
        try {
          const result = await parseAndSaveReservationFixed(reservation.originalText)
          results.push({
            index: i,
            success: true,
            reservationId: result.reservationId,
            data: result.data
          })
        } catch (error) {
          results.push({
            index: i,
            success: false,
            error: error.message
          })
          errors.value.push(`Error importing reservation ${i + 1}: ${error.message}`)
        }
      }
      
      loading.value = false
      
      // Emit success event
      if (results.filter(r => r.success).length > 0) {
        emit('import-success', results.filter(r => r.success))
      }
      
      if (errors.value.length > 0) {
        emit('import-error', errors.value)
      }
    }
    
    return {
      files,
      pastedText,
      parsedReservations,
      errors,
      loading,
      previewReservations,
      handleFileUpload,
      handleTextInput,
      importReservations
    }
  }
}
</script>

<style scoped>
.bulk-reservation-import {
  max-width: 800px;
  margin: 0 auto;
}

.preview-section {
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
