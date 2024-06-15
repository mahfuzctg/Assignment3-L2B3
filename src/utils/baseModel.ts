import { Document, Schema, model } from "mongoose";

export interface BaseModel extends Document {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const baseSchemaFields = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
};

const baseSchema = new Schema(baseSchemaFields, { versionKey: false });

export default model<BaseModel>("BaseModel", baseSchema);
