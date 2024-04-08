using Arpick.Model;
using Microsoft.AspNetCore.Mvc;

namespace Arpick.DataAccessLayer.Interface
{
    public interface IProductService
    {
        Task<int> AddProductAsync(ProductModel product);
        Task<List<ProductModel>> GetAllProducts();
        Task<bool> UpdateProductAsync(int id, ProductModel product);
        Task<bool> RemoveProductAsync(int id);
        Task<List<ProductModel>> GetPopularInCategory(string category);
        Task<List<ProductModel>> GetNewCollections();
        IEnumerable<ProductModel> GetRelatedProducts();
    }
}
