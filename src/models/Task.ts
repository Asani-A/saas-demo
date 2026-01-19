// src/models/Task.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedTo: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['TODO', 'IN_PROGRESS', 'DONE'], 
    default: 'TODO' 
  },
  priority: { 
    type: String, 
    enum: ['LOW', 'MEDIUM', 'HIGH'], 
    default: 'MEDIUM' 
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  project: { type: Schema.Types.ObjectId, ref: 'Project', }
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
