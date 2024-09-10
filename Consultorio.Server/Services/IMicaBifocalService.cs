using Consultorio.Server.Base;
using Consultorio.Server.DTOs;

namespace Consultorio.Server.Services
{
    public interface IMicaBifocalService:IBaseService<micaBifocalDTO, micaBifocalNewDTO>
    {
        micaBifocalDTO EliminarDTO(int id);
    }
}
