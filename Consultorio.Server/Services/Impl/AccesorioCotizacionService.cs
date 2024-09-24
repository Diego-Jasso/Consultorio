using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Utilerias;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.JSInterop.Infrastructure;

namespace Consultorio.Server.Services.Impl
{
    public class AccesorioCotizacionService(IAccesorioCotizacionRepository repository,IMapper mapper): IAccesorioCotizacionService
    {
        private readonly IAccesorioCotizacionRepository _repository = repository;
        private readonly IMapper _mapper = mapper;
        public List<AccesorioCotizacionDTO> ConsultarDTO(int id)
        {
            return _repository.ConsultarDTO(id).ToList();
        }

        public AccesorioCotizacionDTO ConsultarPorId(int id)
        {
            AccesorioCotizacion articulo = _repository.ConsultarPorId(id);
            return _mapper.Map<AccesorioCotizacionDTO>(articulo);
        }

        public AccesorioCotizacionDTO Agregar(AccesorioCotizacionNewDTO dto)
        {
            AccesorioCotizacion currentAccesorio = _repository.ConsultarPorAccesorioId(dto.accesorioid,dto.cotizacionid);
            if (currentAccesorio == null)
            {
                AccesorioCotizacion articulo = _mapper.Map<AccesorioCotizacion>(dto);
                AccesorioCotizacionValidatorService validator = new(_repository);
                ValidationResult result = validator.Validate(articulo);
                if (result.IsValid)
                {
                    _repository.Agregar(articulo);
                    return _mapper.Map<AccesorioCotizacionDTO>(articulo);
                }
                else
                {
                    return AccesorioCotizacionDTO.ToError(
                        result.ToString(Constantes.COMA));
                }
            }
            else
            {
                AccesorioCotizacion articulo = _repository.ConsultarPorId(currentAccesorio.Id);
                articulo.cantidad += dto.cantidad;
                AccesorioCotizacionValidatorService validator = new(_repository);
                ValidationResult result = validator.Validate(articulo);
                if (result.IsValid)
                {
                    _repository.Editar(articulo);
                    return _mapper.Map<AccesorioCotizacionDTO>(articulo);
                }
                else
                {
                    return AccesorioCotizacionDTO.ToError(
                        result.ToString(Constantes.COMA));
                }
            }
        }

        public AccesorioCotizacionDTO Editar(AccesorioCotizacionDTO dto)
        {
            AccesorioCotizacion articulo = _mapper.Map<AccesorioCotizacion>(dto);
            AccesorioCotizacionValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(articulo);
            if (result.IsValid)
            {
                _repository.Editar(articulo);
                return _mapper.Map<AccesorioCotizacionDTO>(articulo);
            }
            else
            {
                return AccesorioCotizacionDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public AccesorioCotizacionDTO EliminarDTO(int id)
        {
            AccesorioCotizacion articulo = _repository.ConsultarPorId(id);
            AccesorioCotizacionValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(articulo);
            if (result.IsValid)
            {
                _repository.Eliminar(articulo);
                return _mapper.Map<AccesorioCotizacionDTO>(articulo);
            }
            else
            {
                return AccesorioCotizacionDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }

        public List<AccesorioCotizacionDTO> ConsultarDTO()
        {
            throw new NotImplementedException();
        }
    }
}
