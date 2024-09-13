using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Utilerias;
using FluentValidation;
using FluentValidation.Results;

namespace Consultorio.Server.Services.Impl
{
    public class MicaProgresivoService(IMicaProgresivoRepository repository, IMapper mapper):IMicaProgresivoService
    {
        private readonly IMicaProgresivoRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public List<micaProgresivoDTO> ConsultarDTO()
        {
            return _repository.ConsultarDTO().ToList();
        }

        public micaProgresivoDTO ConsultarPorId(int id)
        {
            micaProgresivo mica = _repository.ConsultarPorId(id);
            return _mapper.Map<micaProgresivoDTO>(mica);
        }

        public micaProgresivoDTO Agregar(micaProgresivoNewDTO dto)
        {
            micaProgresivo mica = _mapper.Map<micaProgresivo>(dto);
            MicaProgresivoValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Agregar(mica);
                return _mapper.Map<micaProgresivoDTO>(mica);
            }
            else
            {
                return micaProgresivoDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
        }

        public micaProgresivoDTO Editar(micaProgresivoDTO dto)
        {
            micaProgresivo mica = _mapper.Map<micaProgresivo>(dto);
            MicaProgresivoValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Editar(mica);
                return _mapper.Map<micaProgresivoDTO>(mica);
            }
            else
            {
                return micaProgresivoDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public micaProgresivoDTO EliminarDTO(int id)
        {
            micaProgresivo mica = _repository.ConsultarPorId(id);
            MicaProgresivoValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(mica);
            if (result.IsValid)
            {
                _repository.Eliminar(mica);
                return _mapper.Map<micaProgresivoDTO>(mica);
            }
            else
            {
                return micaProgresivoDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }
    }
}
