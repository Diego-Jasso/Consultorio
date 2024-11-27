using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Utilerias;
using FluentValidation;
using FluentValidation.Results;

namespace Consultorio.Server.Services.Impl
{
    public class MicaService(IMicaRepository repository, IMapper mapper):IMicaService
    {
        private readonly IMicaRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public List<MicaDTO> ConsultarDTO()
        {
            return _repository.ConsultarDTO().ToList();
        }

        public List<MicaDTO> ConsultarDTOConFiltro(string filtro)
        {
            return _repository.ConsultarDTOConFiltro(filtro).ToList();
        }

        public MicaDTO ConsultarPorId(int id)
        {
            Mica mica = _repository.ConsultarPorId(id);
            return _mapper.Map<MicaDTO>(mica);
        }

        public MicaDTO Agregar(MicaNewDTO dto)
        {
            Mica mica = _mapper.Map<Mica>(dto);
            MicaValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Agregar(mica);
                return _mapper.Map<MicaDTO>(mica);
            }
            else
            {
                return MicaDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
        }

        public MicaDTO Editar(MicaDTO dto)
        {
            Mica mica = _mapper.Map<Mica>(dto);
            MicaValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Editar(mica);
                return _mapper.Map<MicaDTO>(mica);
            }
            else
            {
                return MicaDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public MicaDTO EliminarDTO(int id)
        {
            Mica mica = _repository.ConsultarPorId(id);
            MicaValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Eliminar(mica);
                return _mapper.Map<MicaDTO>(mica);
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
