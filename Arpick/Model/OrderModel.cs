namespace Arpick.Model
{
    public class OrderModel
    {
        public int Id { get; set; } // Assuming you have an ID for each order

        public int UserId { get; set; } // ID of the user who placed the order

        public int ProductId { get; set; } // ID of the product in the order

        public string PaymentPayload { get; set; } // Payment details, such as payload from Khalti

        // Additional properties as needed, such as order date, quantity, etc.
    }

}
