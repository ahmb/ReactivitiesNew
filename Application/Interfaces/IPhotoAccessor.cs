using Microsoft.AspNetCore.Http;
using Application.Photos;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<PhotoUploadResult> AddProfilePhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    }
}