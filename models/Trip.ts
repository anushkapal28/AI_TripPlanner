import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ITrip extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  destination: string;
  days: number;
  itinerary: string[];
  budget: string;
  pace?: string;
  createdAt?: Date;
}

const tripSchema = new Schema<ITrip>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  destination: { type: String, required: true },
  days: { type: Number, required: true },
  itinerary: { type: [String], default: [] },
  budget: { type: String, required: true },
  pace: { type: String },
}, { timestamps: true });

const Trip = models.Trip || model<ITrip>("Trip", tripSchema);
export default Trip;
