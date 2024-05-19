using Consultorio.Server.Repositories;
using Consultorio.Server.Models;
using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Utilerias;
using FluentValidation.Results;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class ArmazonService(IArmazonRepository repository,IMapper mapper) : IArmazonService
    {
        private readonly IArmazonRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public List<ArmazonDTO> ConsultarDTO() 
        { 
            return _repository.ConsultarDTO().ToList();
        }

        public ArmazonDTO ConsultarPorId(int id)
        {
            Armazon armazon = _repository.ConsultarPorId(id);
            return _mapper.Map<ArmazonDTO>(armazon);
        }

        public ArmazonDTO Agregar(ArmazonNewDTO armazonDto)
        {
            Armazon armazon = _mapper.Map<Armazon>(armazonDto);
            ArmazonValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(armazon);
            if (result.IsValid)
            {
                _repository.Agregar(armazon);
                return _mapper.Map<ArmazonDTO>(armazon);
            }
            else
            {
                return ArmazonDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
        }

        public ArmazonDTO Editar(ArmazonDTO armazonDto)
        {
            Armazon armazon = _mapper.Map<Armazon>(armazonDto);
            ArmazonValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(armazon);
            if (result.IsValid)
            {
                _repository.Editar(armazon);
                return _mapper.Map<ArmazonDTO>(armazon);
            }
            else
            {
                return ArmazonDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public ArmazonDTO EliminarDTO(int id)
        {
            Armazon armazon = _repository.ConsultarPorId(id);
            ArmazonValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(armazon);
            if (result.IsValid)
            {
                _repository.Eliminar(armazon);
                return _mapper.Map<ArmazonDTO>(armazon);
            }
            else
            {
                return ArmazonDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }

    }
}
