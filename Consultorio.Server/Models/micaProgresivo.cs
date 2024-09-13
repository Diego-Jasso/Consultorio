using System.ComponentModel.DataAnnotations;

namespace Consultorio.Server.Models
{
    public class micaProgresivo
    {
        [Key]
        public int Id { get; set; }
        public string Material { get; set; } = string.Empty;
        public string AutographIntelligenge2 { get; set; } = string.Empty;
        public string AutographIID { get; set; } = string.Empty;
        public string IntouchUX { get; set; } = string.Empty;
        public string hdExperience { get; set; } = string.Empty ;
    }
}
