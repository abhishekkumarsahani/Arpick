using Arpick.Model;
using System.Threading.Tasks;

namespace Arpick.DataAccessLayer.Interface
{
    public interface IOrderService
    {
        Task<OrderModel> StoreOrderDetailsAsync(OrderModel order);
        Task<List<OrderModel>> GetOrdersByUserId(int userId);
        Task<List<ProductModel>> GetProductsByOrderId(int orderId);
    }
}
