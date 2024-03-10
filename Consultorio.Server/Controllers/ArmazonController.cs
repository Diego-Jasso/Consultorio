using Consultorio.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Consultorio.Server.Models;
using System.Timers;

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
        [Route("ExistsModelo")]

        public async Task<ActionResult<Armazon>> ExistsModelo(string modelo)
        {
            if(await _service.ExistsModelo(modelo))
            {
                return Ok("El modelo de armazon existe");
            }
            else
            {
                return BadRequest("El modelo de armazon no existe");
            }
            
        }

        [HttpGet]
        [Route("ExistsId")]

        public async Task<ActionResult<Armazon>> ExistsId(int armazonid)
        {
            if(await _service.ExistsId(armazonid))
            {
                return Ok("El armazon existe");
            }
            else
            {
                return BadRequest("El armazon no existe");
            }
        }

        [HttpGet]
        [Route("GetArmazon")]

        public async Task<ActionResult<Armazon>> GetArmazon(int armazonid)
        {
            var armazon = await _service.GetArmazon(armazonid);
            if (armazon == null) return BadRequest();
            return armazon;
        }

        [HttpPost]
        [Route("AddArmazon")]
        public async Task<ActionResult<Armazon>> AddArmazon(Armazon armazon)
        {
            if(await _service.ExistsModelo(armazon.modelo))
            {
                return BadRequest("El modelo de armazon ya existe");
            }
            else
            {
                await _service.AddArmazon(armazon);
                return armazon;
            }
        }

        [HttpPut]
        [Route("UpdateArmazon/{id}")]
        public async Task<ActionResult<Armazon>> UpdateArmazon(int id,Armazon armazon)
        {
            if(armazon.armazonid != id)
            {
                return BadRequest();
            }

            await _service.UpdateArmazon(armazon);
            return NoContent();
        }

        [HttpDelete]
        [Route("DeleteArmazon")]
        public async Task<ActionResult<Armazon>> DeleteArmazon(int armazonId)
        {
            var armazon = await _service.GetArmazon(armazonId);
            if (armazon == null) return BadRequest();
            await _service.DeleteArmazon(armazon);
            return NoContent();
        }
    }
}
