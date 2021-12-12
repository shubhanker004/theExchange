const httpStatus = require('http-status');
const { HttpError } = require('../middlewares/http-error');
const { Site } = require('../models/site');


// ADD VALIDATION

const postSiteArgs = async(req) => {
  try {
    const site = new Site({
      ...req.body
    });
    await site.save();
    return site;
  } catch(error) {
    throw error;
  }
}

const getSiteArgs = async() => {
  try {
    const site = await Site.find({});

    if(!site) {
      throw new HttpError("Site information not found.", httpStatus.NOT_FOUND);
    }
    return site[0];
  } catch(error) {
    throw error;
  }
}

// ADD VALIDATION

const updateSiteArgs = async(req) => {
  try {
    const site = await Site.findOneAndUpdate(
      {_id: req.body._id},
      {"$set": req.body },
      {new : true}
    );

    if(!site) {
      throw new HttpError("Site information not found.", httpStatus.NOT_FOUND);
    }
    
    return site;
  } catch(error) {
    throw error;
  }
}

module.exports = {
  postSiteArgs,
  getSiteArgs,
  updateSiteArgs
}