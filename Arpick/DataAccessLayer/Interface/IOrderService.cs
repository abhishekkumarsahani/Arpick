namespace Arpick.DataAccessLayer.Interface
{
    public interface IOrderService
    {
        Task<bool> StoreOrderDetailsAsync(int userId, string productId, string paymentPayload);
    }
}
