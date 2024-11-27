using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.Server.Controllers
{
    public class ArticuloCotizacionController(IArticuloCotizacionService service): BaseApiController
    {
        [HttpGet("List/{id}")]
        public ActionResult<List<ArticuloCotizacionDTO>> ConsultarDTO(int id)
        {
            return service.ConsultarDTO(id);
        }

        [HttpGet("{id}")]

        public ActionResult<ArticuloCotizacionDTO> ConsultarPorId(int id)
        {
            return service.ConsultarPorId(id);
        }

        [HttpPost]
        public ActionResult<ArticuloCotizacionDTO> Agregar(ArticuloCotizacionNewDTO dto)
        {
            var result = service.Agregar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpPut("{id}")]
        public ActionResult<ArticuloCotizacionDTO> Editar(ArticuloCotizacionDTO dto)
        {
            var result = service.Editar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpDelete("{id}")]
        public ActionResult<ArticuloCotizacionDTO> Delete(int id)
        {
            var result = service.EliminarDTO(id);
            if (result.Success)
                return NoContent();
            else
                return BadRequest(result.Error);
        }
    }
}
