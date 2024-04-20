using Arpick.DataAccessLayer.Interface;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace Arpick.DataAccessLayer.Implementation
{
    public class OrderService : IOrderService
    {
        private readonly string _connectionString;

        public OrderService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Connection");
            if (string.IsNullOrEmpty(_connectionString))
            {
                throw new InvalidOperationException("Connection string is missing or empty.");
            }
        }

        public async Task<bool> StoreOrderDetailsAsync(int userId, string productId, string paymentPayload)
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var query = @"
                        INSERT INTO Orders (UserId, ProductId, PaymentPayload)
                        VALUES (@UserId, @ProductId, @PaymentPayload)
                    ";

                    using (var command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@UserId", userId);
                        command.Parameters.AddWithValue("@ProductId", productId);
                        command.Parameters.AddWithValue("@PaymentPayload", paymentPayload);

                        var rowsAffected = await command.ExecuteNonQueryAsync();
                        return rowsAffected > 0;
                    }
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                Console.WriteLine($"Error storing order details: {ex.Message}");
                return false;
            }
        }
    }
}
