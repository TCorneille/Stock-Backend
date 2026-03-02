const InventoryLogSchema = new mongoose.Schema({

  productId: mongoose.Types.ObjectId,

  change: Number,

  reason: String

}, { timestamps: true });

export const InventoryLog =
  mongoose.model("InventoryLog", InventoryLogSchema);