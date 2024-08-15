using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.Server.Controllers
{
    public class CotizacionController(ICotizacionService service):BaseApiController
    {
        [HttpGet]
        public ActionResult<List<CotizacionDTO>> ConsultarDTO()
        {
            return service.ConsultarDTO();
        }

        [HttpGet("{id}")]

        public ActionResult<CotizacionDTO> ConsultarPorId(int id)
        {
            return service.ConsultarPorIdConFK(id);
        }

        [HttpPost]
        public ActionResult<CotizacionDTO> Agregar(CotizacionNewDTO dto)
        {
            var result = service.Agregar(dto);
            if (result.Success)
                return Ok(result);
            else
                return BadRequest(result.Error);
        }

        [HttpPut("{id}")]
        public ActionResult<CotizacionDTO> Editar(CotizacionDTO dto)
        {
            var result = service.Editar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpDelete("{id}")]
        public ActionResult<CotizacionDTO> Delete(int id)
        {
            var result = service.EliminarDTO(id);
            if (result.Success)
                return NoContent();
            else
                return BadRequest(result.Error);
        }
    }
}
