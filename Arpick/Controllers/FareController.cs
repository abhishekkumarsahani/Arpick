using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arpick.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FareController : ControllerBase
    {
        private const double PricePerKm = 2.5; // Define your price per kilometer here

        [HttpGet("calculate")]
        public IActionResult CalculateFare(double weight, double distance, double length, double breadth, double height)
        {
            // Calculate fare using the provided parameters (implement your fare calculation logic here)
            double fare = CalculateFares(weight, distance, length, breadth, height);
            return Ok(fare);
        }

        // Implement your fare calculation logic here
        private double CalculateFares(double weight, double distance, double length, double breadth, double height)
        {
            // Example fare calculation logic:
            double ratePerKm = 2.5; // Price per kilometer
            double ratePerKg = 1.5; // Price per kilogram
            double ratePerUnitVolume = 1.5; // Price per unit volume (length * breadth * height)

            double fareFromDistance = distance * ratePerKm;
            double fareFromWeight = weight * ratePerKg;
            double volume = length * breadth * height; // Assuming height is 1 (for simplicity)
            double fareFromDimensions = volume * ratePerUnitVolume;

            return fareFromDistance + fareFromWeight + fareFromDimensions;
        }
    }
}

