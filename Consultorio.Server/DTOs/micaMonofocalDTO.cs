using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class micaMonofocalNewDTO
    {
        public string Material { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public float Precio { get; set; }
    }
    public class micaMonofocalDTO: micaMonofocalNewDTO
    {
        public int Id { get; set; }
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;
        public static micaMonofocalDTO ToError(string error)
        {
            return new micaMonofocalDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    }
}
