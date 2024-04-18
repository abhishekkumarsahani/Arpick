using Arpick.DataAccessLayer.Implementation;
using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arpick.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("allpackages")]
        public async Task<ActionResult<List<Package>>> GetAllPackages()
        {
            try
            {
                var packages = await _adminService.GetPackages();
                return Ok(packages);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePackage(int id)
        {
            try
            {
                // Call your service method to remove the package
                await _adminService.RemovePackage(id);
                return NoContent(); // Return 204 No Content if successful
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("allusers")]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetAllUsers()
        {
            try
            {
                var userList = await _adminService.GetAllUsers();
                return Ok(userList);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
