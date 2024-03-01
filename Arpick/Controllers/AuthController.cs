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
    }
}
