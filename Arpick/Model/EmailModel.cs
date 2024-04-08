namespace Arpick.Model
{
    public class EmailRequest
    {
        public string ToEmail { get; set; }
        public BookingDetails BookingDetails { get; set; }
    }

    public class BookingDetails
    {
        public string PickupLocation { get; set; }
        public string PickupTime { get; set; }
    }
}
