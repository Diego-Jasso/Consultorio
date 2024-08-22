using AutoMapper;
using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Utilerias;
using FluentValidation;
using FluentValidation.Results;
using System.Runtime.CompilerServices;

namespace Consultorio.Server.Services.Impl
{
    public class AccesorioService(IAccesorioRepository repository,IMapper mapper) : IAccesorioService
    {
        private readonly IAccesorioRepository _repository = repository;
        private readonly IMapper _mapper = mapper;
        public List<AccesorioDTO> ConsultarDTO()
        {
            return _repository.ConsultarDTO().ToList();
        }

        public AccesorioDTO ConsultarPorId(int id)
        {
            Accesorio mica = _repository.ConsultarPorId(id);
            return _mapper.Map<AccesorioDTO>(mica);
        }

        public AccesorioDTO Agregar(AccesorioNewDTO dto)
        {
            Accesorio accesorio = _mapper.Map<Accesorio>(dto);
            AccesorioValidatorService validator = new();
            ValidationResult result = validator.Validate(accesorio); 
            if (result.IsValid)
            {
                _repository.Agregar(accesorio);
                return _mapper.Map<AccesorioDTO>(accesorio);
            }
            else
            {
                return AccesorioDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
        }

        public AccesorioDTO Editar(AccesorioDTO dto)
        {
            Accesorio accesorio = _mapper.Map<Accesorio>(dto);
            AccesorioValidatorService validator = new();
            ValidationResult result = validator.Validate(accesorio);
            if (result.IsValid)
            {
                _repository.Editar(accesorio);
                return _mapper.Map<AccesorioDTO>(accesorio);
            }
            else
            {
                return AccesorioDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public AccesorioDTO EliminarDTO(int id)
        {
            Accesorio accesorio = _repository.ConsultarPorId(id);
            AccesorioValidatorService validator = new();
            ValidationResult result = validator.Validate(accesorio);
            if (result.IsValid)
            {
                _repository.Eliminar(accesorio);
                return _mapper.Map<AccesorioDTO>(accesorio);
            }
            else
            {
                return AccesorioDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }
    }
}
