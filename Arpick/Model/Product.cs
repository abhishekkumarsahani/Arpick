namespace Arpick.Model
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; } // Add property for image URL
        public string Category { get; set; }
        public decimal NewPrice { get; set; }
        public decimal OldPrice { get; set; }
    }



}
