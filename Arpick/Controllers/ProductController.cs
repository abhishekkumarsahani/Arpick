using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arpick.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("addproduct")]
        public async Task<IActionResult> AddProduct(ProductModel product)
        {
            try
            {
                int productId = await _productService.AddProductAsync(product);
                return Ok(new { ProductId = productId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error adding product: " + ex.Message);
            }
        }

        [HttpGet("allproducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var products = await _productService.GetAllProducts();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> UpdateProduct(int id, ProductModel product)
        {
            try
            {
                bool updated = await _productService.UpdateProductAsync(id, product);
                if (updated)
                {
                    return Ok(true);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveProduct(int id)
        {
            try
            {
                bool isRemoved = await _productService.RemoveProductAsync(id);
                if (isRemoved)
                {
                    return Ok(new { success = true, message = "Product removed successfully" });
                }
                else
                {
                    return NotFound(new { success = false, message = "Product not found" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = $"Internal server error: {ex.Message}" });
            }
        }
        [HttpGet("popular/clothing")]
        public async Task<IActionResult> GetPopularInClothingCategory()
        {
            try
            {
                var products = await _productService.GetPopularInCategory("clothing");
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("newcollections")]
        public async Task<IActionResult> GetNewCollections()
        {
            try
            {
                var newCollections = await _productService.GetNewCollections();
                return Ok(newCollections);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("relatedproduct")]
        public ActionResult<IEnumerable<ProductModel>> GetRelatedProducts()
        {
            try
            {
                var relatedProducts = _productService.GetRelatedProducts();
                return Ok(relatedProducts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
