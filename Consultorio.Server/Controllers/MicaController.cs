using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.Server.Controllers
{
    public class MicaController(IMicaService service) : BaseApiController
    {
        private readonly IMicaService _service = service;

        [HttpGet]

        public async Task<ActionResult<IEnumerable<Mica>>> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Mica>> GetById(int id)
        {
            var mica = await _service.GetById(id);
            if (mica == null) return BadRequest();
            return mica;
        }

        [HttpPost]

        public async Task<ActionResult<Mica>> Add(Mica mica)
        {
            await _service.Add(mica);
            return mica;
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<Mica>> Update(int id,Mica mica)
        {
            if (mica.micaid != id)
            {
                return BadRequest();
            }
            await _service.Update(mica);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Mica>> Delete(int id)
        {
            var mica = await _service.GetById(id);
            if (mica ==null) return BadRequest();
            await _service.Delete(mica);
            return NoContent();
        }
    }
}
