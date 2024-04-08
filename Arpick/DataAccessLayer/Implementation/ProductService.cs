using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Arpick.DataAccessLayer.Implementation
{
    public class ProductService : IProductService
    {
        private readonly IConfiguration _configuration;

        public ProductService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<int> AddProductAsync(ProductModel product)
        {
            try
            {
                using (var connection = new SqlConnection(_configuration["ConnectionStrings:Connection"]))
                {
                    await connection.OpenAsync();

                    using (var command = new SqlCommand(
                        "INSERT INTO Products (Name, Category, NewPrice, OldPrice, ImageUrl) " +
                        "VALUES (@Name, @Category, @NewPrice, @OldPrice, @ImageUrl); SELECT SCOPE_IDENTITY();", connection))
                    {
                        command.Parameters.AddWithValue("@Name", product.Name);
                        command.Parameters.AddWithValue("@Category", product.Category);
                        command.Parameters.AddWithValue("@NewPrice", product.NewPrice);
                        command.Parameters.AddWithValue("@OldPrice", product.OldPrice);
                        command.Parameters.AddWithValue("@ImageUrl", product.ImageUrl);

                        int productId = Convert.ToInt32(await command.ExecuteScalarAsync());
                        return productId;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding product: " + ex.Message);
            }
        }
        public async Task<List<ProductModel>> GetAllProducts()
        {
            List<ProductModel> products = new List<ProductModel>();

            using (var connection = new SqlConnection(_configuration["ConnectionStrings:Connection"]))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("SELECT * FROM Products", connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            var product = new ProductModel
                            {
                                Id = Convert.ToInt32(reader["Id"]),
                                Name = reader["Name"].ToString(),
                                ImageUrl = reader["ImageUrl"].ToString(), // Assuming ImageUrl column stores the image URL
                                Category = reader["Category"].ToString(),
                                NewPrice = Convert.ToDecimal(reader["NewPrice"]),
                                OldPrice = Convert.ToDecimal(reader["OldPrice"])
                            };
                            products.Add(product);
                        }
                    }
                }
            }

            return products;
        }
        public async Task<bool> UpdateProductAsync(int id, ProductModel product)
        {
            try
            {
                using (var connection = new SqlConnection(_configuration["ConnectionStrings:Connection"]))
                {
                    await connection.OpenAsync();

                    // Fetch existing product details
                    string selectQuery = "SELECT Name, Category, NewPrice, OldPrice, ImageUrl FROM Products WHERE Id = @Id";
                    using (var selectCommand = new SqlCommand(selectQuery, connection))
                    {
                        selectCommand.Parameters.AddWithValue("@Id", id);
                        using (var reader = await selectCommand.ExecuteReaderAsync())
                        {
                            if (!reader.Read())
                            {
                                throw new Exception("Product not found");
                            }

                            // Update product details
                            product.Name = reader.GetString(reader.GetOrdinal("Name"));
                            product.Category = reader.GetString(reader.GetOrdinal("Category"));
                            product.NewPrice = reader.GetDecimal(reader.GetOrdinal("NewPrice"));
                            product.OldPrice = reader.GetDecimal(reader.GetOrdinal("OldPrice"));
                            product.ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl"));
                        }
                    }

                    // Update product in the database
                    string sql = @"UPDATE Products 
                           SET Name = @Name, 
                               Category = @Category, 
                               NewPrice = @NewPrice, 
                               OldPrice = @OldPrice, 
                               ImageUrl = @ImageUrl
                           WHERE Id = @Id";

                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@Id", id);
                        command.Parameters.AddWithValue("@Name", product.Name);
                        command.Parameters.AddWithValue("@Category", product.Category);
                        command.Parameters.AddWithValue("@NewPrice", product.NewPrice);
                        command.Parameters.AddWithValue("@OldPrice", product.OldPrice);
                        command.Parameters.AddWithValue("@ImageUrl", product.ImageUrl);

                        int rowsAffected = await command.ExecuteNonQueryAsync();
                        return rowsAffected > 0;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating product: " + ex.Message);
            }
        }

        public async Task<bool> RemoveProductAsync(int id)
        {
            using (var connection = new SqlConnection(_configuration["ConnectionStrings:Connection"]))
            {
                await connection.OpenAsync();

                string sql = "DELETE FROM Products WHERE Id = @Id";
                using (var command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@Id", id);

                    int rowsAffected = await command.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
            }
        }
        public async Task<List<ProductModel>> GetPopularInCategory(string category)
        {
            using (var connection = new SqlConnection(_configuration["ConnectionStrings:Connection"]))
            {
                await connection.OpenAsync();
                var query = "SELECT TOP 4 * FROM Products WHERE Category = @Category ORDER BY Id DESC";
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Category", category);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var products = new List<ProductModel>();
                        while (await reader.ReadAsync())
                        {
                            var product = new ProductModel
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                                OldPrice = reader.GetDecimal(reader.GetOrdinal("OldPrice")),
                                NewPrice = reader.GetDecimal(reader.GetOrdinal("NewPrice")),
                                // Map other properties as needed
                            };
                            products.Add(product);
                        }
                        return products;
                    }
                }
            }
        }
        
        public async Task<List<ProductModel>> GetNewCollections()
        {
            using (var connection = new SqlConnection(_configuration["ConnectionStrings:Connection"]))
            {
                await connection.OpenAsync();
                var query = "SELECT TOP 8 * FROM Products WHERE Category != 'clothing' ORDER BY Id DESC";
                using (var command = new SqlCommand(query, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var newCollections = new List<ProductModel>();
                        while (await reader.ReadAsync())
                        {
                            var product = new ProductModel
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                                OldPrice = reader.GetDecimal(reader.GetOrdinal("OldPrice")),
                                NewPrice = reader.GetDecimal(reader.GetOrdinal("NewPrice")),
                                // Map other properties as needed
                            };
                            newCollections.Add(product);
                        }
                        return newCollections;
                    }
                }
            }
        }
        public IEnumerable<ProductModel> GetRelatedProducts()
        {
            using (SqlConnection connection = new SqlConnection(_configuration["ConnectionStrings:Connection"]))
            {
                connection.Open();

                string query = @"
            SELECT * FROM (
                SELECT *, ROW_NUMBER() OVER(PARTITION BY Category ORDER BY NEWID()) AS rn
                FROM Products
            ) AS temp
            WHERE rn = 1";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        List<ProductModel> relatedProducts = new List<ProductModel>();

                        while (reader.Read())
                        {
                            relatedProducts.Add(new ProductModel
                            {
                                Id = (int)reader["Id"],
                                Name = (string)reader["Name"],
                                ImageUrl = (string)reader["ImageUrl"],
                                NewPrice = (decimal)reader["NewPrice"],
                                OldPrice = (decimal)reader["OldPrice"]
                            });
                        }

                        return relatedProducts;
                    }
                }
            }
        }


    }
}
