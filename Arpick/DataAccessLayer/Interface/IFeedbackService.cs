using Arpick.Model;

namespace Arpick.DataAccessLayer.Interface
{
    public interface IFeedbackService
    {
        Task SaveFeedbackAsync(Feedback feedback);
        Task<IEnumerable<Feedback>> GetFeedbackByUserIdAsync(int userId);
    }
}
