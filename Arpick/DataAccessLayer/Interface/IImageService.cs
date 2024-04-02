namespace Arpick.DataAccessLayer.Interface
{
    public interface IImageService
    {
        Task<string> UploadImageAsync(IFormFile image);
    }
}
