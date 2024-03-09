const Delivery = require('../models/delivery');
const fs = require('fs');


exports.getOneDelivery = (req, res, next) => {
  Delivery.findOne({
      package_id: req.params.id
    })
    .then(delivery => res.status(200).json({
      delivery
    }))
    .catch(error => res.status(404).json({
      error
    }));
}

exports.getDeliveries = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const result = {};
    const totalDeliveries = await Delivery.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDeliveries = totalDeliveries;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Delivery.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await Delivery.find()
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.rowsPerPage = limit;
    return res.json({
      msg: "Deliveries Fetched successfully",
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Sorry, something went wrong"
    });
  }
};