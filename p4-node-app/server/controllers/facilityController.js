import Facility from '../models/facility.js';

export const createFacility = async (req, res) => {
  const facility = new Facility(req.body);
  try {
    await facility.save();
    res.status(201).send(facility);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.send(facilities);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: 'Facility not found' });
    }
    res.send(facility);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!facility) {
      return res.status(404).send({ message: 'Facility not found' });
    }
    res.send(facility);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: 'Facility not found' });
    }
    res.send({ message: 'Facility deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};
