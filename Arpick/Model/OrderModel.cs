namespace Arpick.Model
{
    public class OrderModel
    {
        public int UserId { get; set; }
        public List<int> ProductIds { get; set; }
        public string PaymentStatus { get; set; }
        public int OrderId { get; set; }
        public List<ProductModel>? Products { get; set; } // Add this property

    }

}
