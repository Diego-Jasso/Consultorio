using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Utilerias;
using FluentValidation.Results;

namespace Consultorio.Server.Services.Impl
{
    public class LenteDeContactoService(ILenteDeContactoRepository repository,IMapper mapper): ILenteDeContactoService
    {
        private readonly ILenteDeContactoRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public List<lenteDeContactoDTO> ConsultarDTO()
        {
            return _repository.ConsultarDTO().ToList();
        }

        public lenteDeContactoDTO ConsultarPorId(int id)
        {
            lenteDeContacto lente = _repository.ConsultarPorId(id);
            return _mapper.Map<lenteDeContactoDTO>(lente);
        }

        public lenteDeContactoDTO Agregar(lenteDeContactoNewDTO dto)
        {
            lenteDeContacto lente = _mapper.Map<lenteDeContacto>(dto);
            LenteDeContactoValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(lente);
            if (result.IsValid)
            {
                _repository.Agregar(lente);
                return _mapper.Map<lenteDeContactoDTO>(lente);
            }
            else
            {
                return lenteDeContactoDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
        }

        public lenteDeContactoDTO Editar(lenteDeContactoDTO dto)
        {
            lenteDeContacto lente = _mapper.Map<lenteDeContacto>(dto);
            LenteDeContactoValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(lente);
            if (result.IsValid)
            {
                _repository.Editar(lente);
                return _mapper.Map<lenteDeContactoDTO>(lente);
            }
            else
            {
                return lenteDeContactoDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public lenteDeContactoDTO EliminarDTO(int id)
        {
            lenteDeContacto lente = _repository.ConsultarPorId(id);
            LenteDeContactoValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(lente);
            if (result.IsValid)
            {
                _repository.Eliminar(lente);
                return _mapper.Map<lenteDeContactoDTO>(lente);
            }
            else
            {
                return lenteDeContactoDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }
    }
}
