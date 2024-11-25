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
    public class ArticuloCotizacionService(IArticuloCotizacionRepository repository,IMapper mapper): IArticuloCotizacionService
    {
        private readonly IArticuloCotizacionRepository _repository = repository;
        private readonly IMapper _mapper = mapper;
        public List<ArticuloCotizacionDTO> ConsultarDTO(int id)
        {
            return _repository.ConsultarDTO(id).ToList();
        }

        public ArticuloCotizacionDTO ConsultarPorId(int id)
        {
            ArticuloCotizacion articulo = _repository.ConsultarPorId(id);
            return _mapper.Map<ArticuloCotizacionDTO>(articulo);
        }

        public ArticuloCotizacionDTO Agregar(ArticuloCotizacionNewDTO dto)
        {
            ArticuloCotizacion currentArmazon = _repository.ConsultarPorArmazonId(dto.armazonid,dto.cotizacionid);
            if (currentArmazon == null)
            {
                ArticuloCotizacion articulo = _mapper.Map<ArticuloCotizacion>(dto);
                ArticuloCotizacionValidatorService validator = new(_repository);
                ValidationResult result = validator.Validate(articulo);
                if (result.IsValid)
                {
                    _repository.Agregar(articulo);
                    return _mapper.Map<ArticuloCotizacionDTO>(articulo);
                }
                else
                {
                    return ArticuloCotizacionDTO.ToError(
                        result.ToString(Constantes.COMA));
                }
            }
            else
            {
                ArticuloCotizacion articulo = _repository.ConsultarPorId(currentArmazon.id);
                articulo.cantidad += dto.cantidad;
                ArticuloCotizacionValidatorService validator = new(_repository);
                ValidationResult result = validator.Validate(articulo);
                if (result.IsValid)
                {
                    _repository.Editar(articulo);
                    return _mapper.Map<ArticuloCotizacionDTO>(articulo);
                }
                else
                {
                    return ArticuloCotizacionDTO.ToError(
                        result.ToString(Constantes.COMA));
                }
            }
        }

        public ArticuloCotizacionDTO Editar(ArticuloCotizacionDTO dto)
        {
            ArticuloCotizacion articulo = _mapper.Map<ArticuloCotizacion>(dto);
            ArticuloCotizacionValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(articulo);
            if (result.IsValid)
            {
                _repository.Editar(articulo);
                return _mapper.Map<ArticuloCotizacionDTO>(articulo);
            }
            else
            {
                return ArticuloCotizacionDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public ArticuloCotizacionDTO EliminarDTO(int id)
        {
            ArticuloCotizacion articulo = _repository.ConsultarPorId(id);
            ArticuloCotizacionValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(articulo);
            if (result.IsValid)
            {
                _repository.Eliminar(articulo);
                return _mapper.Map<ArticuloCotizacionDTO>(articulo);
            }
            else
            {
                return ArticuloCotizacionDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }

        public List<ArticuloCotizacionDTO> ConsultarDTO()
        {
            throw new NotImplementedException();
        }
    }
}
