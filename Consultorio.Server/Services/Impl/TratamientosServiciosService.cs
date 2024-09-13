using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Utilerias;
using FluentValidation;
using FluentValidation.Results;

namespace Consultorio.Server.Services.Impl
{
    public class TratamientosServiciosService(ITratamientosServiciosRepository repository, IMapper mapper):ITratamientosServiciosService
    {
        private readonly ITratamientosServiciosRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public List<tratamientosServiciosDTO> ConsultarDTO()
        {
            return _repository.ConsultarDTO().ToList();
        }

        public tratamientosServiciosDTO ConsultarPorId(int id)
        {
            tratamientosServicios mica = _repository.ConsultarPorId(id);
            return _mapper.Map<tratamientosServiciosDTO>(mica);
        }

        public tratamientosServiciosDTO Agregar(tratamientosServiciosNewDTO dto)
        {
            tratamientosServicios mica = _mapper.Map<tratamientosServicios>(dto);
            TratamientosServiciosValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Agregar(mica);
                return _mapper.Map<tratamientosServiciosDTO>(mica);
            }
            else
            {
                return tratamientosServiciosDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
        }

        public tratamientosServiciosDTO Editar(tratamientosServiciosDTO dto)
        {
            tratamientosServicios mica = _mapper.Map<tratamientosServicios>(dto);
            TratamientosServiciosValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Editar(mica);
                return _mapper.Map<tratamientosServiciosDTO>(mica);
            }
            else
            {
                return tratamientosServiciosDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public tratamientosServiciosDTO EliminarDTO(int id)
        {
            tratamientosServicios mica = _repository.ConsultarPorId(id);
            TratamientosServiciosValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Eliminar(mica);
                return _mapper.Map<tratamientosServiciosDTO>(mica);
            }
            else
            {
                return tratamientosServiciosDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }
    }
}
