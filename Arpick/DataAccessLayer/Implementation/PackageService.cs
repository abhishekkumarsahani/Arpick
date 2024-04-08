using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.Data.SqlClient;

namespace Arpick.DataAccessLayer.Implementation
{
    public class PackageService : IPackageService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _sqlConnection;

        public PackageService(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlConnection = new SqlConnection(_configuration["ConnectionStrings:Connection"]);
        }

        public async Task<Package> CreatePackage(Package package)
        {
            using (var command = new SqlCommand())
            {
                command.Connection = _sqlConnection;
                command.CommandText = "INSERT INTO Packages (SenderName,SenderAddress,SenderContact, ReceiverName,ReceiverAddress,ReceiverContact, PackageWeight, PackageName, UserId) VALUES (@SenderName,@SenderAddress,@SenderContact, @ReceiverName,@ReceiverAddress,@ReceiverContact,@PackageWeight, @PackageName, @UserId); SELECT SCOPE_IDENTITY();";
                command.Parameters.AddWithValue("@SenderName", package.SenderName);
                command.Parameters.AddWithValue("@SenderAddress", package.SenderAddress);
                command.Parameters.AddWithValue("@SenderContact", package.SenderContact);
                command.Parameters.AddWithValue("@ReceiverName", package.ReceiverName);
                command.Parameters.AddWithValue("@ReceiverAddress", package.ReceiverAddress);
                command.Parameters.AddWithValue("@ReceiverContact", package.ReceiverContact);
                command.Parameters.AddWithValue("@PackageWeight", package.PackageWeight);
                command.Parameters.AddWithValue("@PackageName", package.PackageName);
                command.Parameters.AddWithValue("@UserId", package.UserId);

                await _sqlConnection.OpenAsync();
                var newId = await command.ExecuteScalarAsync();
                await _sqlConnection.CloseAsync();

                package.PackageId = Convert.ToInt32(newId);
                return package;
            }
        }
    }
}
