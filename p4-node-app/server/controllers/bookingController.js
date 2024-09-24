import Booking from '../models/booking.js';

export const createBooking = async (req, res) => {
  const booking = new Booking(req.body);
  try {
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userid').populate('facilityid');
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('userid').populate('facilityid');
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    res.send(booking);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    res.send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    res.send({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};
