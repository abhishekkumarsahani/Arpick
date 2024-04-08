using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Arpick.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("sendPackageBookingEmail")]
        public async Task<IActionResult> SendPackageBookingEmail([FromBody] EmailRequest emailRequest)
        {
            try
            {
                await _emailService.SendPackageBookingEmail(emailRequest);
                return Ok("Email sent successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Failed to send email: {ex.Message}");
            }
        }
    }
}
