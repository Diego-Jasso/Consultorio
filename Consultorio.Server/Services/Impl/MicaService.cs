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
    public class MicaService(IMicaRepository repository,IMapper mapper) : IMicaService
    {
        private readonly IMicaRepository _repository = repository;
        private readonly IMapper _mapper = mapper;
        public List<MicaDTO> ConsultarDTO()
        {
            return _repository.ConsultarDTO().ToList();
        }

        public MicaDTO ConsultarPorId(int id)
        {
            Mica mica = _repository.ConsultarPorId(id);
            return mapper.Map<MicaDTO>(mica);
        }

        public MicaDTO Agregar(MicaNewDTO micaDto)
        {
            Mica mica = mapper.Map<Mica>(micaDto);
            MicaValidatorService validator = new();
            ValidationResult result = validator.Validate(mica); 
            if (result.IsValid)
            {
                _repository.Agregar(mica);
                return mapper.Map<MicaDTO>(mica);
            }
            else
            {
                return MicaDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
        }

        public MicaDTO Editar(MicaDTO micaDto)
        {
            Mica mica = mapper.Map<Mica>(micaDto);
            MicaValidatorService validator = new();
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Editar(mica);
                return mapper.Map<MicaDTO>(mica);
            }
            else
            {
                return MicaDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public MicaDTO EliminarDTO(int id)
        {
            Mica mica = repository.ConsultarPorId(id);
            MicaValidatorService validator = new();
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Eliminar(mica);
                return mapper.Map<MicaDTO>(mica);
            }
            else
            {
                return MicaDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }
    }
}
