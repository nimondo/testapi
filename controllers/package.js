const Package = require("../models/package");
const fs = require("fs");

exports.createPackage = (req, res, next) => {
  const packageData = req.body;
  const package = new Package({
    ...packageData,
  });
  package
    .save()
    .then(() =>
      res.status(201).json({
        message: "Package created !",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};
exports.getOnePackage = (req, res, next) => {
  Package.findOne({
    package_id: req.params.id,
  })
    .then((package) =>
      res.status(200).json({
        package,
      })
    )
    .catch((error) =>
      res.status(404).json({
        error,
      })
    );
};

exports.getPackages = async (req, res) => {
  let user = req.query.user;
  let filter = {
    user: user,
  };
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const result = {};
    const totalPackages = await Package.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalPackages = totalPackages;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Package.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await Package.find(filter)
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.rowsPerPage = limit;
    return res.json({
      msg: "Packages Fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Sorry, something went wrong",
    });
  }
};
exports.updatePackage = (req, res, next) => {
  const packageData = {
    ...req.body,
  };
  Package.updateOne(
    {
      _id: req.params.id,
    },
    {
      ...packageData,
      _id: req.params.id,
    }
  )
    .then(() =>
      res.status(200).json({
        message: "Updated!",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

exports.deletePackage = (req, res, next) => {
  Package.deleteOne({
    _id: req.params.id,
  })
    .then(() =>
      res.status(200).json({
        message: "Objet supprimé !",
      })
    )
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};
