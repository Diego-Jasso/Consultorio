using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;
using Consultorio.Server.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Consultorio.Server.DTOs;
using Consultorio.Server.Base.Impl;

namespace Consultorio.Server.Repositories.Impl
{
    public class ArmazonRepository(AppDbContext context): BaseRepository<Armazon>(context), IArmazonRepository
    {
        private readonly AppDbContext _context = context;

        
        public IEnumerable<ArmazonDTO> ConsultarDTO()
        {
            return from arma in _context.armazon
                   select new ArmazonDTO
                   {
                       armazonid = arma.armazonid,
                       marca = arma.marca,
                       modelo = arma.modelo,
                       color = arma.color,
                       cantidad_disponible = arma.cantidad_disponible,
                       precio = arma.precio,
                       material = arma.material,
                       tipo_de_lente = arma.tipo_de_lente
                   };
        }

       public Armazon ConsultarPorId(int id)
        {
            return _context.armazon.Find(id);
        }

        public bool ExisteModelo(string modelo)
        {
            return _context.armazon.Any(armazon => armazon.modelo == modelo.ToLower());
        }
    }
}
