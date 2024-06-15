import { Document, Schema } from "mongoose";
import timestamp from "mongoose-timestamp";

export interface BaseModel extends Document {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export const baseSchemaFields = {
  deletedAt: { type: Date, default: null },
};

export const baseSchema = new Schema(baseSchemaFields, { versionKey: false });
baseSchema.plugin(timestamp);
