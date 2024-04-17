using Arpick.DataAccessLayer.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Arpick.Model;
using Microsoft.AspNetCore.Authorization;

namespace Arpick.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class AuthController : ControllerBase
    {
        private readonly IAuth _auth;

        public AuthController(IAuth auth)
        {
            _auth = auth;
        }

        [HttpPost]
        public async Task<IActionResult> SignUp(SignUpRequest request)
        {
            Response response = new Response();
            try
            {
                response = await _auth.SignUp(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> SignIn(SignInRequest request)
        {
            Response response = new Response();
            try
            {
                response = await _auth.SignIn(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest request)
        {
            Response response = new Response();
            try
            {
                response = await _auth.ForgotPassword(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return Ok(response);
        }
        [HttpGet("{userId}")]
        public async Task<ActionResult<UserModel>> GetUserDetails(int userId)
        {
            var userDetails = await _auth.GetUserDetails(userId);
            if (userDetails == null)
            {
                return NotFound("User not found");
            }
            return userDetails;
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUserDetails(int userId, UserModel user)
        {
            if (userId != user.UserId)
            {
                return BadRequest("User ID in the request path does not match the user ID in the request body.");
            }

            try
            {
                bool success = await _auth.UpdateUserDetails(user);

                if (success)
                {
                    return Ok("User details updated successfully.");
                }
                else
                {
                    return NotFound($"User with ID {userId} not found or failed to update user details.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating user details: {ex.Message}");
            }
        }
    }
}
