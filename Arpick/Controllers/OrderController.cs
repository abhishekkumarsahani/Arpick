// OrderController.cs
using System.Threading.Tasks;
using Arpick.DataAccessLayer.Implementation;
using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
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
        public async Task<IActionResult> StoreOrderDetails([FromBody] OrderModel order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var storedOrder = await _orderService.StoreOrderDetailsAsync(order);
                return Ok(storedOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error storing order details: {ex.Message}");
            }
        }
        // GET: api/order/{userId}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetOrdersWithProducts(int userId)
        {
            try
            {
                // Fetch orders for the given userId
                List<OrderModel> orders = await _orderService.GetOrdersByUserId(userId);

                // For each order, fetch product details and add them to the order
                foreach (var order in orders)
                {
                    List<ProductModel> products = await _orderService.GetProductsByOrderId(order.OrderId);
                    order.Products = products;
                }

                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
