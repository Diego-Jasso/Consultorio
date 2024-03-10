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

        public async Task<bool> ExistsModelo(string modelo)
        {
            return await _repository.ExistsModelo(modelo);
        }
        public async Task<bool> ExistsId(int armazonId)
        {
            return await _repository.ExistsId(armazonId);
        }

        public async Task<int> AddArmazon(Armazon armazon)
        {
            return await _repository.AddArmazon(armazon);
        }

        public async Task<int> UpdateArmazon(Armazon armazon)
        {
            return await _repository.UpdateArmazon(armazon);
        }

        public async Task<int> DeleteArmazon(Armazon armazon)
        {
            return await _repository.DeleteArmazon(armazon);
        }

        public async Task<Armazon?> GetArmazon(int armazonId)
        {
            return await _repository.GetArmazon(armazonId);
        }
    }
}
