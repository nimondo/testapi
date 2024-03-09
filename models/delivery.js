const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({
  delivery_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package"
  },
  pickup_time: {
    type: Date
  },
  start_time: {
    type: Date
  },
  end_time: {
    type: Date
  },
  location: {
    type: {
      lat: {
        type: String,
        required: true
      },
      long: {
        type: String,
        required: true
      },
    }
  },
  status: {
    type: String,
    enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Delivery', deliverySchema);