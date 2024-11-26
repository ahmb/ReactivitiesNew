using System;
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
            Console.WriteLine("config.Value.CloudName!!!");

            _cloudinarySettings = config.Value;
            Console.WriteLine(config.Value.CloudName);
            Console.WriteLine(_cloudinarySettings.CloudName);

            var acc = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret);

            _cloudinary = new Cloudinary(acc);
        }

        [Obsolete("Using obsolete secureuri property")]
        public PhotoUploadResult AddPhoto(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                };
                uploadResult = _cloudinary.Upload(uploadParams);
            }
            if (uploadResult.Error != null)
                throw new Exception(uploadResult.Error.Message);

            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUri.AbsoluteUri
            };
        }

        public string DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = _cloudinary.Destroy(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}