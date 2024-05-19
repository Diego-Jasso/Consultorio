using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Services
{
    public interface IMicaService : IBaseService<MicaDTO,MicaNewDTO>
    {
        MicaDTO EliminarDTO(int id);
    }
}
