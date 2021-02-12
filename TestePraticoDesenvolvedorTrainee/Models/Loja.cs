using Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using TestePraticoDesenvolvedorTrainee.DataSource;

namespace TestePraticoDesenvolvedorTrainee.Models
{
    public class Loja
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Identificador { get; set; }
        public string Nome { get; set; }




        public static List<Loja> ListarLojas()
        {
            using (TestePraticoDataContext dtc = new TestePraticoDataContext())
            {

                return dtc.ExecuteQuery<Loja>($@"select * from loja").ToList();
            }

        }


    }
}