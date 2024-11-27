using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Mapper
{
    public class MapperCode : Profile
    {
        public MapperCode() 
        {
            CreateMap<ArmazonNewDTO, Armazon>();
            CreateMap<ArmazonDTO,Armazon>().ReverseMap();
            CreateMap<AccesorioNewDTO, Accesorio>();
            CreateMap<AccesorioDTO, Accesorio>().ReverseMap();
            CreateMap<UsuarioNewDTO, Usuario>();
            CreateMap<UsuarioDTO,Usuario>().ReverseMap();
            CreateMap<CotizacionNewDTO, Cotizacion>();
            CreateMap<CotizacionDTO, Cotizacion>().ReverseMap();
            CreateMap<ArticuloCotizacionNewDTO, ArticuloCotizacion>();
            CreateMap<ArticuloCotizacionDTO, ArticuloCotizacion>().ReverseMap();
            CreateMap<lenteDeContactoNewDTO,lenteDeContacto>();
            CreateMap<lenteDeContactoDTO,lenteDeContacto>().ReverseMap();
            CreateMap<micaBifocalNewDTO, micaBifocal>();
            CreateMap<micaBifocalDTO, micaBifocal>().ReverseMap();
            CreateMap<micaProgresivoNewDTO,micaProgresivo>();
            CreateMap<micaProgresivoDTO,micaProgresivo>().ReverseMap();
            CreateMap<MicaNewDTO,Mica>();
            CreateMap<MicaDTO,Mica>().ReverseMap();
            CreateMap<micaMonofocalNewDTO, micaMonofocal>();
            CreateMap<micaMonofocalDTO,micaMonofocal>().ReverseMap();
            CreateMap<AccesorioCotizacionNewDTO, AccesorioCotizacion>();
            CreateMap<AccesorioCotizacionDTO,AccesorioCotizacion>().ReverseMap();
        }
    }
}
