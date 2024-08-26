using Consultorio.Server.Base;
using Consultorio.Server.DTOs;

namespace Consultorio.Server.Services
{
    public interface ILenteDeContactoService:IBaseService<lenteDeContactoDTO,lenteDeContactoNewDTO>
    {
        lenteDeContactoDTO EliminarDTO(int id);
    }
}
