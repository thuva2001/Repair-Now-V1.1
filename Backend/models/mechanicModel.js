import mongoose from "mongoose";

const mechanicSchema = mongoose.Schema(
  {
    ShopName: {
      required: true,
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    ShopAddress: {
      required: true,
      type: String,
    },
    ShopNear: {
      required: true,
      type: String,
    },
    ShopType: {
      required: true,
      type: String,
    },
    PhoneNumber: {
      required: true,
      type: String,
    },
    Email: {
      type: String,
      required: false,
    },
    ShopPhoto: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    ShopTime: {
      required: true,
      type: String,
    },
    ispost: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

mechanicSchema.index({ location: "2dsphere" }); // Add geospatial index

const Mechanic = mongoose.model("mechanic", mechanicSchema);
export default Mechanic;
