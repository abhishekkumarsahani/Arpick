// OrderService.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

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

        public async Task<OrderModel> StoreOrderDetailsAsync(OrderModel order)
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var query = @"
                            INSERT INTO Orders (UserId, PaymentStatus)
                            VALUES (@UserId, @PaymentStatus);
                            SELECT SCOPE_IDENTITY();
                        ";

                    using (var command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@UserId", order.UserId);
                        command.Parameters.AddWithValue("@PaymentStatus", order.PaymentStatus);

                        int orderId = Convert.ToInt32(await command.ExecuteScalarAsync());

                        query = @"
                                INSERT INTO OrderProducts (OrderId, ProductId)
                                VALUES (@OrderId, @ProductId);
                                ";

                        foreach (var productId in order.ProductIds)
                        {
                            using (var productCommand = new SqlCommand(query, connection))
                            {
                                productCommand.Parameters.AddWithValue("@OrderId", orderId);
                                productCommand.Parameters.AddWithValue("@ProductId", productId);
                                await productCommand.ExecuteNonQueryAsync();
                            }
                        }

                        order.OrderId = orderId;
                        return order;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error storing order details: {ex.Message}");
                throw;
            }
        }

        public async Task<List<ProductModel>> GetProductsByOrderId(int orderId)
        {
            List<ProductModel> products = new List<ProductModel>();

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var query = @"
                         SELECT p.Id, p.Name, p.NewPrice
                            FROM Products p
                            INNER JOIN OrderProducts od ON p.Id = od.ProductId
                            WHERE od.OrderId =  @OrderId;
                            ";

                    using (var command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@OrderId", orderId);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                var product = new ProductModel
                                {
                                    Id = Convert.ToInt32(reader["Id"]),
                                    Name = reader["Name"].ToString(),
                                    NewPrice = Convert.ToDecimal(reader["NewPrice"])
                                };
                                products.Add(product);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching products by order ID: {ex.Message}");
                throw;
            }

            return products;
        }
        public async Task<List<OrderModel>> GetOrdersByUserId(int userId)
        {
            List<OrderModel> orders = new List<OrderModel>();

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var query = @"
                        SELECT OrderId, UserId, PaymentStatus
                        FROM Orders
                        WHERE UserId = @UserId;
                    ";

                    using (var command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@UserId", userId);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                var order = new OrderModel
                                {
                                    OrderId = Convert.ToInt32(reader["OrderId"]),
                                    UserId = Convert.ToInt32(reader["UserId"]),
                                    PaymentStatus = reader["PaymentStatus"].ToString()
                                };
                                orders.Add(order);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching orders by user ID: {ex.Message}");
                throw;
            }

            return orders;
        }
    }
}
