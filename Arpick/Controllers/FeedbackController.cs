using Arpick.DataAccessLayer.Implementation;
using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Arpick.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpPost("addfeedback")]
        public async Task<IActionResult> SaveFeedback(Feedback feedback)
        {
            await _feedbackService.SaveFeedbackAsync(feedback);
            return Ok("Feedback saved successfully.");
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetFeedbackByUserId(int userId)
        {
            var feedback = await _feedbackService.GetFeedbackByUserIdAsync(userId);
            return Ok(feedback);
        }
    }
}
