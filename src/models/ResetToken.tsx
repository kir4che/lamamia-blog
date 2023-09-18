import mongoose from "mongoose"

const { Schema } = mongoose

const resetTokenSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.models.ResetToken || mongoose.model("ResetToken", resetTokenSchema)