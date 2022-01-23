import mongoose from "mongoose";

const coupenSchema = mongoose.Schema(
  {
    date: {
      type: Date,
    },
    coupenCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupen = mongoose.model("Coupen", coupenSchema);

export default Coupen;
