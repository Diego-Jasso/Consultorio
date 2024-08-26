using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Utilerias;
using FluentValidation;
using FluentValidation.Results;

namespace Consultorio.Server.Services.Impl
{
    public class MicaMonofocalService(IMicaMonofocalRepository repository, IMapper mapper):IMicaMonofocalService
    {
        private readonly IMicaMonofocalRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public List<micaMonofocalDTO> ConsultarDTO()
        {
            return _repository.ConsultarDTO().ToList();
        }

        public micaMonofocalDTO ConsultarPorId(int id)
        {
            micaMonofocal mica = _repository.ConsultarPorId(id);
            return _mapper.Map<micaMonofocalDTO>(mica);
        }

        public micaMonofocalDTO Agregar(micaMonofocalNewDTO dto)
        {
            micaMonofocal mica = _mapper.Map<micaMonofocal>(dto);
            MicaMonofocalValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Agregar(mica);
                return _mapper.Map<micaMonofocalDTO>(mica);
            }
            else
            {
                return micaMonofocalDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
        }

        public micaMonofocalDTO Editar(micaMonofocalDTO dto)
        {
            micaMonofocal mica = _mapper.Map<micaMonofocal>(dto);
            MicaMonofocalValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Editar(mica);
                return _mapper.Map<micaMonofocalDTO>(mica);
            }
            else
            {
                return micaMonofocalDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public micaMonofocalDTO EliminarDTO(int id)
        {
            micaMonofocal mica = _repository.ConsultarPorId(id);
            MicaMonofocalValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Eliminar(mica);
                return _mapper.Map<micaMonofocalDTO>(mica);
            }
            else
            {
                return micaMonofocalDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }
    }
}
