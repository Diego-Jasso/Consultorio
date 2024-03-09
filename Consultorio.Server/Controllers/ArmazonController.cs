using Consultorio.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Consultorio.Server.Models;

namespace Consultorio.Server.Controllers
{
    public class ArmazonController(IArmazonService service): BaseApiController
    {
        private readonly IArmazonService _service = service;

        [HttpGet]
        [Route("GetArmazones")]
        public async Task<ActionResult<IEnumerable<Armazon>>> GetArmazones()
        {
            return Ok(await _service.GetArmazones());
        }

        [HttpGet]
        [Route("Exists")]

        public async Task<ActionResult<Armazon>> Exists(string modelo)
        {
            if(await _service.Exists(modelo))
            {
                return Ok("El modelo de armazon existe");
            }
            else
            {
                return BadRequest("El modelo de armazon no existe");
            }
            
        }
    }
}
