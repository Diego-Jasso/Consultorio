using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Utilerias;
using FluentValidation;
using FluentValidation.Results;

namespace Consultorio.Server.Services.Impl
{
    public class CotizacionService(ICotizacionRepository repository,IArticuloCotizacionRepository artrepository,IAccesorioCotizacionRepository accrepository,IMapper mapper):ICotizacionService
    {
        private readonly ICotizacionRepository _repository = repository;
        private readonly IArticuloCotizacionRepository _artrepository = artrepository;
        private readonly IAccesorioCotizacionRepository _accrepository = accrepository;
        private readonly IMapper _mapper = mapper;

        public List<CotizacionDTO> ConsultarDTO()
        {
            return _repository.ConsultarDTO().ToList();
        }

        public CotizacionDTO ConsultarPorId(int id)
        {
            Cotizacion cotizacion = _repository.ConsultarPorId(id);
            return _mapper.Map<CotizacionDTO>(cotizacion);
        }
        public CotizacionDTO ConsultarPorIdConFK(int id)
        {
            return _repository.ConsultarPorIdConFK(id);
        }

        public CotizacionDTO Agregar(CotizacionNewDTO cotizacionDto)
        {
            Cotizacion cotizacion = _mapper.Map<Cotizacion>(cotizacionDto);
            cotizacion.statusid = 2;
            cotizacion.folio = _repository.ConsultarFolio();
            cotizacion.ultimaModificacion = DateOnly.FromDateTime(DateTime.Now);
            cotizacion.fecha_de_creacion = DateOnly.FromDateTime(DateTime.Now);
            CotizacionValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(cotizacion);
            if (result.IsValid)
            {
                _repository.Agregar(cotizacion);
                return _mapper.Map<CotizacionDTO>(cotizacion);
            }
            else
            {
                return CotizacionDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
        }

        public CotizacionDTO Editar(CotizacionDTO cotizacionDto)
        {
            cotizacionDto.ultimaModificacion = DateOnly.FromDateTime(DateTime.Now);
            cotizacionDto.precio = _artrepository.ConsultarPrecioTotal(cotizacionDto.cotizacionid) + _accrepository.ConsultarPrecioTotal(cotizacionDto.cotizacionid);
            Cotizacion cotizacion = _mapper.Map<Cotizacion>(cotizacionDto);
            CotizacionValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(cotizacion);
            if (result.IsValid)
            {
                _repository.Editar(cotizacion);
                return _mapper.Map<CotizacionDTO>(cotizacion);
            }
            else
            {
                return CotizacionDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public CotizacionDTO EliminarDTO(int id)
        {
            Cotizacion cotizacion = _repository.ConsultarPorId(id);
            CotizacionValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(cotizacion);
            if (result.IsValid)
            {
                _repository.Eliminar(cotizacion);
                return _mapper.Map<CotizacionDTO>(cotizacion);
            }
            else
            {
                return CotizacionDTO.ToError(
                    result.ToString(Constantes.COMA));
            }

        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }

    }
}
