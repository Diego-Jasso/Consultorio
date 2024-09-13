using Consultorio.Server.Utilerias;

namespace Consultorio.Server.DTOs
{
    public class micaProgresivoNewDTO
    {
        public string Material { get; set; } = string.Empty;
        public string AutographIntelligenge2 { get; set; } = string.Empty;
        public string AutographIID { get; set; } = string.Empty;
        public string IntouchUX { get; set; } = string.Empty;
        public string hdExperience { get; set; } = string.Empty;
    }
    public class micaProgresivoDTO: micaProgresivoNewDTO
    {
        public int Id { get; set; }
        public bool Success { get; set; } = Constantes.SUCCESS;
        public string Error { get; set; } = string.Empty;
        public static micaProgresivoDTO ToError(string error)
        {
            return new micaProgresivoDTO
            {
                Error = error,
                Success = Constantes.FAILURE
            };
        }
    }
}
