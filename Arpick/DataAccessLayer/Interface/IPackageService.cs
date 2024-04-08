using Arpick.Model;

namespace Arpick.DataAccessLayer.Interface
{
    public interface IPackageService
    {
        Task<Package> CreatePackage(Package package);

    }
}
