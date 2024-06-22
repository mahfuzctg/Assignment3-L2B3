import { Request, Response } from "express";
import { CarService } from "./car.service";

class CarController {
  async createCar(req: Request, res: Response): Promise<void> {
    try {
      const car = await CarService.createCarIntoDb(req.body);
      res.status(201).json({ success: true, data: car });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getSingleCar(req: Request, res: Response): Promise<void> {
    try {
      const car = await CarService.getSingleCarFromDB(req.params.id);
      if (!car) {
        res.status(404).json({ success: false, message: "Car not found" });
        return;
      }
      res.status(200).json({ success: true, data: car });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAllCars(req: Request, res: Response): Promise<void> {
    try {
      const cars = await CarService.getAllCars();
      res.status(200).json({ success: true, data: cars });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateCar(req: Request, res: Response): Promise<void> {
    try {
      const car = await CarService.updateCarIntoDB(req.params.id, req.body);
      res.status(200).json({ success: true, data: car });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteCar(req: Request, res: Response): Promise<void> {
    try {
      const car = await CarService.deleteCarFromDB(req.params.id);
      res.status(200).json({ success: true, data: car });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async returnCar(req: Request, res: Response): Promise<void> {
    const { bookingId, endTime } = req.body;
    if (!bookingId || !endTime) {
      res.status(400).json({
        success: false,
        message: "bookingId and endTime are required in the request body",
      });
      return;
    }

    try {
      const updatedBooking = await CarService.returnCar(bookingId, endTime);
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Car returned successfully",
        data: updatedBooking,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

export const carControllers = new CarController();
