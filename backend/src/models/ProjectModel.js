
import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});

export default mongoose.model('Projects', projectSchema);


