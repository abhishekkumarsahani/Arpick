using Arpick.DataAccessLayer.Interface;

namespace Arpick.DataAccessLayer.Implementation
{
    public class ImageService : IImageService
    {

        private readonly string _imagesDirectory = "upload/images"; // Path to store images

        public async Task<string> UploadImageAsync(IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                throw new ArgumentException("Image file is required.");
            }

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
            string filePath = Path.Combine(_imagesDirectory, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            // Construct the image URL using the base URL
            string baseUrl = "https://localhost:44337/"; // Update with your actual base URL
            string imageUrl = $"{baseUrl}upload/images/{uniqueFileName}";

            return imageUrl;
        }
    }
}
