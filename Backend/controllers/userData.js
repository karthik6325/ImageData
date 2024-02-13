
const mongoose = require('mongoose');
const imageModel = require('../model/imagemodel');

exports.postImage = async (req, res) => {
  try {
    const { imgData } = req.body;
    const userId = req.user.userId;

    const response = await imageModel.create({
      image: imgData,
      user: userId,
    });

    if(response) res.status(200).json({ message: 'Success' });
    else res.status(400).json({ message: 'Bad request' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getImagesForUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const images = await imageModel.find({ user: userId });
    const imageData = images.map(image => image.image);

    res.status(200).json(imageData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



