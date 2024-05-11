using Consultorio.Server.Repositories;
using Consultorio.Server.Models;

namespace Consultorio.Server.Services.Impl
{
    public class ArmazonService(IArmazonRepository repository) : IArmazonService
    {
        private readonly IArmazonRepository _repository = repository;

        public Task<IEnumerable<Armazon>> GetAll() 
        { 
            return _repository.GetAll();
        }

        public async Task<bool> ExistsModelo(string modelo)
        {
            return await _repository.ExistsModelo(modelo);
        }
        public async Task<bool> ExistsId(int armazonId)
        {
            return await _repository.ExistsId(armazonId);
        }

        public async Task<int> Add(Armazon armazon)
        {
            return await _repository.Add(armazon);
        }

        public async Task<int> Update(Armazon armazon)
        {
            return await _repository.Update(armazon);
        }

        public async Task<int> Delete(Armazon armazon)
        {
            return await _repository.Delete(armazon);
        }

        public async Task<Armazon?> GetById(int armazonId)
        {
            return await _repository.GetById(armazonId);
        }
    }
}
