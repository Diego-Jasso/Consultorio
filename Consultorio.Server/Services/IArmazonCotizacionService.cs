using Consultorio.Server.Base;
using Consultorio.Server.DTOs;

namespace Consultorio.Server.Services
{
    public interface IArmazonCotizacionService:IBaseService<ArmazonCotizacionDTO,ArmazonCotizacionNewDTO>
    {
        List<ArmazonCotizacionDTO> ConsultarDTO(int id);
        ArmazonCotizacionDTO EliminarDTO(int id);
    }
}
