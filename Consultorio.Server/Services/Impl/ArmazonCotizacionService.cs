using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Utilerias;
using FluentValidation.Results;

namespace Consultorio.Server.Services.Impl
{
    public class ArmazonCotizacionService(IArmazonCotizacionRepository repository,IMapper mapper): IArmazonCotizacionService
    {
        private readonly IArmazonCotizacionRepository _repository = repository;
        private readonly IMapper _mapper = mapper;
        public List<ArmazonCotizacionDTO> ConsultarDTO(int id)
        {
            return _repository.ConsultarDTO(id).ToList();
        }

        public ArmazonCotizacionDTO ConsultarPorId(int id)
        {
            ArmazonCotizacion articulo = _repository.ConsultarPorId(id);
            return _mapper.Map<ArmazonCotizacionDTO>(articulo);
        }

        public ArmazonCotizacionDTO Agregar(ArmazonCotizacionNewDTO dto)
        {
            ArmazonCotizacion articulo = _mapper.Map<ArmazonCotizacion>(dto);
            ArmazonCotizacionValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(articulo);
            if (result.IsValid)
            {
                _repository.Agregar(articulo);
                return _mapper.Map<ArmazonCotizacionDTO>(articulo);
            }
            else
            {
                return ArmazonCotizacionDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
        }

        public ArmazonCotizacionDTO Editar(ArmazonCotizacionDTO dto)
        {
            ArmazonCotizacion articulo = _mapper.Map<ArmazonCotizacion>(dto);
            ArmazonCotizacionValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(articulo);
            if (result.IsValid)
            {
                _repository.Editar(articulo);
                return _mapper.Map<ArmazonCotizacionDTO>(articulo);
            }
            else
            {
                return ArmazonCotizacionDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public ArmazonCotizacionDTO EliminarDTO(int id)
        {
            ArmazonCotizacion articulo = _repository.ConsultarPorId(id);
            ArmazonCotizacionValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(articulo);
            if (result.IsValid)
            {
                _repository.Eliminar(articulo);
                return _mapper.Map<ArmazonCotizacionDTO>(articulo);
            }
            else
            {
                return ArmazonCotizacionDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }

        public List<ArmazonCotizacionDTO> ConsultarDTO()
        {
            throw new NotImplementedException();
        }
    }
}
