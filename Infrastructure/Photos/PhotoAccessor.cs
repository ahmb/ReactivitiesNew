using System;
using System.Threading.Tasks;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : Application.Interfaces.IPhotoAccessor
    {
        public IConfiguration Configuration { get; }
        private readonly CloudinarySettings _cloudinarySettings;

        private readonly Cloudinary _cloudinary;

        //pull strongly typed Cloudinary setting information out of the config
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {

            _cloudinarySettings = config.Value;

            var acc = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret);

            _cloudinary = new Cloudinary(acc);
        }

        [Obsolete("Using obsolete secureuri property")]
        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            if (file != null && file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(400).Width(700).Crop("fill").Gravity("face")
                };
                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                    throw new Exception(uploadResult.Error.Message);

                return new PhotoUploadResult
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString()
                };
            }
            return null;
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}