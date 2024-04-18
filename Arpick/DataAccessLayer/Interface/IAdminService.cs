using Arpick.Model;

namespace Arpick.DataAccessLayer.Interface
{
    public interface IAdminService
    {
        Task<List<Package>> GetPackages();
        Task RemovePackage(int id);
        Task<List<UserModel>> GetAllUsers();

    }
}
