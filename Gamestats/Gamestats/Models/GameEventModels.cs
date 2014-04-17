using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Gamestats.Models
{
    public class GameEventModels
    {
        [Required]
        public int id { get; set; }

        [Required]
        public String desc { get; set; }

        [Required]
        public String acronym { get; set; }
    }
}