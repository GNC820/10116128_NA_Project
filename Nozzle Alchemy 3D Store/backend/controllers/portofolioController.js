const Portofolio = require('../models/portofolio');

// Controller for adding an image
const addImage = async (req, res) => {
  try {
    // Extract data from request body
    const { image, addedBy, title } = req.body;

    // Create new image record in the database
    const newImage = await Portofolio.create({ image, addedBy, title });

    // Respond with the newly created image
    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error adding image:', error);
    res.status(500).json({ error: 'Failed to add image' });
  }
};

// Controller for retrieving all images
const getAllImages = async (req, res) => {
  try {
    // Retrieve all images from the database
    const images = await Portofolio.findAll();

    // Respond with the list of images
    res.status(200).json(images);
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ error: 'Failed to retrieve images' });
  }
};

const deleteImage = async (req, res) => {
    try {
      // Find the image by ID
      const image = await Portofolio.findByPk(req.params.id);
  
      // Check if the image exists
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      // Delete the image from the database
       await Portofolio.destroy({
        where: {
          id: image.id // Specify the condition for deletion
        }
      });
  
      // Respond with a success message
      res.json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports = { addImage, getAllImages, deleteImage };