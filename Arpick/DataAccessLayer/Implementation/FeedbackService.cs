using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Arpick.DataAccessLayer.Implementation
{
    public class FeedbackService : IFeedbackService
    {
        private readonly string _connectionString;

        public FeedbackService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Connection");
        }

        public async Task SaveFeedbackAsync(Feedback feedback)
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    // Create the SQL command
                    var command = new SqlCommand(
                        "INSERT INTO Feedback (UserId, Comment, CreatedAt) VALUES (@UserId, @Comment, @CreatedAt)",
                        connection
                    );

                    // Add parameters
                    command.Parameters.AddWithValue("@UserId", feedback.UserId);
                    command.Parameters.AddWithValue("@Comment", feedback.Comment);
                    command.Parameters.AddWithValue("@CreatedAt", DateTime.UtcNow);

                    // Execute the command
                    await command.ExecuteNonQueryAsync();
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                throw new Exception($"Failed to save feedback: {ex.Message}");
            }
        }

        public async Task<IEnumerable<Feedback>> GetFeedbackByUserIdAsync(int userId)
        {
            var feedbackList = new List<Feedback>();

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    string sql = "SELECT FeedbackId, UserId, Comment FROM Feedback WHERE UserId = @UserId";
                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@UserId", userId);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                var feedback = new Feedback
                                {
                                    FeedbackId = reader.GetInt32(reader.GetOrdinal("FeedbackId")),
                                    UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                                    Comment = reader.GetString(reader.GetOrdinal("Comment"))
                                };
                                feedbackList.Add(feedback);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                throw new Exception($"Failed to retrieve feedback: {ex.Message}");
            }

            return feedbackList;
        }
    }
}
