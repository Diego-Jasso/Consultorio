using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Services
{
    public interface IArmazonService : IBaseService<ArmazonDTO,ArmazonNewDTO>
    {
        ArmazonDTO EliminarDTO(int id);

    }
}
