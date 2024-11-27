using Consultorio.Server.Base;
using Consultorio.Server.DTOs;

namespace Consultorio.Server.Services
{
    public interface IMicaService:IBaseService<MicaDTO, MicaNewDTO>
    {
        MicaDTO EliminarDTO(int id);
        List<MicaDTO> ConsultarDTOConFiltro(string filtro);
    }
}
