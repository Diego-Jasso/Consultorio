using Consultorio.Server.Repositories;
using Consultorio.Server.Models;

namespace Consultorio.Server.Services.Impl
{
    public class ArmazonService(IArmazonRepository repository) : IArmazonService
    {
        private readonly IArmazonRepository _repository = repository;

        public Task<IEnumerable<Armazon>> GetArmazones() 
        { 
            return _repository.GetArmazones();
        }

        public async Task<bool> Exists(string modelo)
        {
            return await _repository.Exists(modelo);
        }

        public async Task<Armazon> AddArmazon(Armazon armazon)
        {
            return await _repository.AddArmazon(armazon);
        }
    }
}
