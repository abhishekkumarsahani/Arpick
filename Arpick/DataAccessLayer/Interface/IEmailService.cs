using Arpick.Model;

namespace Arpick.DataAccessLayer.Interface
{
    public interface IEmailService
    {
        Task<bool> SendPackageBookingEmail(EmailRequest emailRequest);

    }
}
