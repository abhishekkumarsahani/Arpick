using Arpick.DataAccessLayer.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Arpick.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("store")]
        public async Task<IActionResult> StoreOrderDetails(int userId, string productId, string paymentPayload)
        {
            try
            {
                bool success = await _orderService.StoreOrderDetailsAsync(userId, productId, paymentPayload);
                if (success)
                {
                    return Ok("Order details stored successfully.");
                }
                else
                {
                    return BadRequest("Failed to store order details.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
