// controllers/landController.js
import Land from '../models/Land.js';

export const registerLand = async (req, res) => {
  try {
    const { ownerName, location, area } = req.body;
    const documents = req.files.map(file => file.filename);

    const newLand = new Land({ ownerName, location, area, documents });
    await newLand.save();

    res.status(201).json({ message: 'Land registered successfully', land: newLand });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
