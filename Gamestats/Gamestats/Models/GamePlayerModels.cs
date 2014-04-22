using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Gamestats.Models
{
    public class GamePlayerModels
    {
        public int Id { get; set; }
        public String Name { get; set; }

        [Display(Name = "Imagem")]
        public String Img { get; set; }

        [HiddenInput(DisplayValue = false)]
        public String ImgType { get; set; }
        public String Acronym { get; set; }
        public String Team { get; set; }
    }
}