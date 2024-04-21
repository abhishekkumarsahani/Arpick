namespace Arpick.Model
{
    public class OrderModel
    {
        public int UserId { get; set; }
        public string PaymentStatus { get; set; }
        public List<ProductQuantity> ProductQuantities { get; set; }
        public List<ProductModel>? Products { get; set; } // Add this property
        public int OrderId { get; set; }
    }

    public class ProductQuantity
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

}
