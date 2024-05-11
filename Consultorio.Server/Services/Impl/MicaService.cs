using Consultorio.Server.Models;
using Consultorio.Server.Repositories;

namespace Consultorio.Server.Services.Impl
{
    public class MicaService(IMicaRepository repository) : IMicaService
    {
        private readonly IMicaRepository _repository = repository;
        public async Task<int> Add(Mica obj)
        {
            return await _repository.Add(obj);
        }

        public async Task<int> Delete(Mica obj)
        {
            return await _repository.Delete(obj);
        }

        public async Task<IEnumerable<Mica>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<Mica?> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<int> Update(Mica obj)
        {
            return await _repository.Update(obj);
        }
    }
}
