using System.ComponentModel.DataAnnotations;

namespace GameObserver.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }
    }


}
