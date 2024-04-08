using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Arpick.DataAccessLayer.Implementation
{
    public class EmailService : IEmailService
    {
        private readonly SmtpSettings _smtpSettings;

        public EmailService(IOptions<SmtpSettings> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
        }

        public async Task<bool> SendPackageBookingEmail(EmailRequest emailRequest)
        {
            try
            {
                using (var client = new SmtpClient(_smtpSettings.Host, _smtpSettings.Port))
                {
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(_smtpSettings.UserName, _smtpSettings.Password);

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(_smtpSettings.UserName),
                        Subject = "Package Booking Notification",
                        Body = $"Hello,\n\nYour package has been successfully booked.\n\nPickup Location: {emailRequest.BookingDetails.PickupLocation}\nPickup Time: {emailRequest.BookingDetails.PickupTime}\n\nThank you for choosing our services.",
                        IsBodyHtml = true
                    };
                    mailMessage.To.Add(emailRequest.ToEmail);

                    await client.SendMailAsync(mailMessage);
                }

                return true; 
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
                return false; 
            }
        }

    }
}
