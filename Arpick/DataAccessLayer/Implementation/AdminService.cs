using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.Data.SqlClient;
using System.Data.Common;

namespace Arpick.DataAccessLayer.Implementation
{
    public class AdminService : IAdminService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _sqlConnection;

        public AdminService(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlConnection = new SqlConnection(_configuration["ConnectionStrings:Connection"]);
        }

        public async Task<List<Package>> GetPackages()
        {
            List<Package> packages = new List<Package>();

            try
            {
                await _sqlConnection.OpenAsync();

                string sqlQuery = @"
                                    SELECT PackageId, SenderName, SenderAddress, SenderContact,
                                    ReceiverName, ReceiverAddress, ReceiverContact,
                                    PackageWeight, PackageName, UserId
                                    FROM Packages;"; // Removed WHERE clause

                using (SqlCommand sqlCommand = new SqlCommand(sqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;

                    using (DbDataReader dataReader = await sqlCommand.ExecuteReaderAsync())
                    {
                        while (await dataReader.ReadAsync())
                        {
                            Package package = new Package
                            {
                                PackageId = dataReader.GetInt32(dataReader.GetOrdinal("PackageId")),
                                SenderName = dataReader.GetString(dataReader.GetOrdinal("SenderName")),
                                SenderAddress = dataReader.GetString(dataReader.GetOrdinal("SenderAddress")),
                                SenderContact = dataReader.GetString(dataReader.GetOrdinal("SenderContact")),
                                ReceiverName = dataReader.GetString(dataReader.GetOrdinal("ReceiverName")),
                                ReceiverAddress = dataReader.GetString(dataReader.GetOrdinal("ReceiverAddress")),
                                ReceiverContact = dataReader.GetString(dataReader.GetOrdinal("ReceiverContact")),
                                PackageWeight = dataReader.GetString(dataReader.GetOrdinal("PackageWeight")),
                                PackageName = dataReader.GetString(dataReader.GetOrdinal("PackageName")),
                                UserId = dataReader.GetInt32(dataReader.GetOrdinal("UserId"))
                            };

                            packages.Add(package);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions
                Console.WriteLine($"Error fetching packages: {ex.Message}");
            }
            finally
            {
                _sqlConnection.Close();
            }

            return packages;
        }
        public async Task RemovePackage(int id)
        {
            var connectionString = _configuration.GetConnectionString("Connection");

            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                var sql = "DELETE FROM Packages WHERE PackageId = @PackageId";

                using (var command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@PackageId", id);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }
        public async Task<List<UserModel>> GetAllUsers()
        {
            List<UserModel> userList = new List<UserModel>();

            try
            {
                if (_sqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _sqlConnection.OpenAsync();
                }

                string sqlQuery = @"SELECT * FROM ARPICK.dbo.UserTable;";

                using (SqlCommand sqlCommand = new SqlCommand(sqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    using (DbDataReader dataReader = await sqlCommand.ExecuteReaderAsync())
                    {
                        while (await dataReader.ReadAsync())
                        {
                            UserModel userDetails = new UserModel
                            {
                                UserId = dataReader["UserId"] != DBNull.Value ? Convert.ToInt32(dataReader["UserId"]) : 0,
                                UserName = dataReader["UserName"] != DBNull.Value ? Convert.ToString(dataReader["UserName"]) : string.Empty,
                                Email = dataReader["Email"] != DBNull.Value ? Convert.ToString(dataReader["Email"]) : string.Empty,
                                FullName = dataReader["FullName"] != DBNull.Value ? Convert.ToString(dataReader["FullName"]) : string.Empty,
                                Address = dataReader["Address"] != DBNull.Value ? Convert.ToString(dataReader["Address"]) : string.Empty,
                                Contact = dataReader["Contact"] != DBNull.Value ? Convert.ToString(dataReader["Contact"]) : string.Empty,
                            };

                            userList.Add(userDetails);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions
            }
            finally
            {
                _sqlConnection.Close();
            }

            return userList;
        }


    }
}
