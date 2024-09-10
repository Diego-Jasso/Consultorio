using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Utilerias;
using FluentValidation;
using FluentValidation.Results;

namespace Consultorio.Server.Services.Impl
{
    public class MicaBifocalService(IMicaBifocalRepository repository, IMapper mapper):IMicaBifocalService
    {
        private readonly IMicaBifocalRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public List<micaBifocalDTO> ConsultarDTO()
        {
            return _repository.ConsultarDTO().ToList();
        }

        public micaBifocalDTO ConsultarPorId(int id)
        {
            micaBifocal mica = _repository.ConsultarPorId(id);
            return _mapper.Map<micaBifocalDTO>(mica);
        }

        public micaBifocalDTO Agregar(micaBifocalNewDTO dto)
        {
            micaBifocal mica = _mapper.Map<micaBifocal>(dto);
            MicaBifocalValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Agregar(mica);
                return _mapper.Map<micaBifocalDTO>(mica);
            }
            else
            {
                return micaBifocalDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
        }

        public micaBifocalDTO Editar(micaBifocalDTO dto)
        {
            micaBifocal mica = _mapper.Map<micaBifocal>(dto);
            MicaBifocalValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Editar(mica);
                return _mapper.Map<micaBifocalDTO>(mica);
            }
            else
            {
                return micaBifocalDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public micaBifocalDTO EliminarDTO(int id)
        {
            micaBifocal mica = _repository.ConsultarPorId(id);
            MicaBifocalValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Eliminar(mica);
                return _mapper.Map<micaBifocalDTO>(mica);
            }
            else
            {
                return micaBifocalDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }
    }
}
