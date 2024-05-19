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
            CreateMap<MicaNewDTO, Mica>();
            CreateMap<MicaDTO, Mica>().ReverseMap();
            CreateMap<UsuarioNewDTO, Usuario>();
            CreateMap<UsuarioDTO,Usuario>().ReverseMap();
        }
    }
}
