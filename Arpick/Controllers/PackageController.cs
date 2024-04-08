using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arpick.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController : ControllerBase
    {
        private readonly IPackageService _packageService;

        public PackageController(IPackageService packageService)
        {
            _packageService = packageService;
        }

        [HttpPost("addpackage")]
        public async Task<IActionResult> CreatePackage([FromBody] Package package)
        {
            try
            {
                var createdPackage = await _packageService.CreatePackage(package);
                return Ok(createdPackage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
