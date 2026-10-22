import mongoose from 'mongoose';

const additionalGuestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  roleOnWedding: { type: String, required: true },
  connectedTo: { type: String, enum: ['Groom', 'Bride', 'Both'], required: true },
  relationship: { type: String, required: true }
});

const rsvpSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  contactNumber: { type: String, required: true, trim: true },
  roleOnWedding: { type: String, required: true },
  connectedTo: { type: String, enum: ['Groom', 'Bride', 'Both'], required: true },
  relationship: { type: String, required: true },
  willAttend: { type: String, enum: ['Yes', 'No'], required: true },
  message: { type: String, trim: true },
  additionalGuests: [additionalGuestSchema],
  partyCount: { type: Number, default: 1 }
}, {
  timestamps: true
});

// Auto-calculate total party headcount before saving
rsvpSchema.pre('save', async function() {
  if (this.willAttend === 'Yes') {
    this.partyCount = 1 + (this.additionalGuests ? this.additionalGuests.length : 0);
  } else {
    this.partyCount = 0;
  }
});

export default mongoose.models.RSVP || mongoose.model('RSVP', rsvpSchema);