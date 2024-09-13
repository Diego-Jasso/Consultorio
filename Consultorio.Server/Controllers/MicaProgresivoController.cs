using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.Server.Controllers
{
    public class MicaProgresivoController(IMicaProgresivoService service):BaseApiController
    {
        [HttpGet]
        public ActionResult<List<micaProgresivoDTO>> ConsultarDTO()
        {
            return service.ConsultarDTO();
        }

        [HttpGet("{id}")]

        public ActionResult<micaProgresivoDTO> ConsultarPorId(int id)
        {
            return service.ConsultarPorId(id);
        }

        [HttpPost]
        public ActionResult<micaProgresivoDTO> Agregar(micaProgresivoNewDTO dto)
        {
            var result = service.Agregar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpPut("{id}")]
        public ActionResult<micaProgresivoDTO> Editar(micaProgresivoDTO dto)
        {
            var result = service.Editar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpDelete("{id}")]
        public ActionResult<micaProgresivoDTO> Delete(int id)
        {
            var result = service.EliminarDTO(id);
            if (result.Success)
                return NoContent();
            else
                return BadRequest(result.Error);
        }
    }
}
