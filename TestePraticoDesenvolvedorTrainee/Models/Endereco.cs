using Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TestePraticoDesenvolvedorTrainee.DataSource;

namespace TestePraticoDesenvolvedorTrainee.Models
{
    public class Endereco
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Identificador { get; set; }
        public string Logradouro { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }
        public string Cidade { get; set; }
        public string UF { get; set; }
        public string CEP { get; set; }
        //[NotMapped]
        //public Cliente cliente { get; set; }
        public int IdentificadorCliente { get; set; }

        public static List<Endereco> ListarClientes()
        {
            return new Contexto().Endereco.ToList();
        }

        public static Endereco SelecionarEndereco(int Identificador)
        {
            using (TestePraticoDataContext dtc = new TestePraticoDataContext())
            {
                Endereco endereco = dtc.ExecuteQuery<Endereco>($@"select * from endereco where identificador = {Identificador}").FirstOrDefault();
                //endereco.cliente = Cliente.SelecionarCliente(endereco.Identificador);
                return endereco;
            }
        }

        public static void Inserir(Endereco endereco)
        {
            using (TestePraticoDataContext dtc = new TestePraticoDataContext())
            {
                dtc.ExecuteCommand($@"insert into Endereco (IdentificadorCliente, Logradouro, Numero, Complemento, Cidade, Uf,CEP)
Values ({endereco.IdentificadorCliente}, '{endereco.Logradouro}', '{endereco.Numero}', '{endereco.Complemento}','{endereco.Cidade}', '{endereco.UF}','{endereco.CEP}')");
            }
        }

        public static void Alterar(Endereco endereco)
        {
            using (TestePraticoDataContext dtc = new TestePraticoDataContext())
            {
                dtc.ExecuteCommand($@"UPDATE       Endereco
SET                IdentificadorCliente = {endereco.IdentificadorCliente}, Logradouro ='{endereco.Logradouro}', Numero ='{endereco.Numero}', Complemento ='{endereco.Complemento}', Cidade ='{endereco.Cidade}', UF ='{endereco.UF}', CEP ='{endereco.CEP}'
where identificador = {endereco.Identificador}
");
            }
        }

        public static void Apagar(int Identificador)
        {
            using (TestePraticoDataContext dtc = new TestePraticoDataContext())
            {
                dtc.ExecuteCommand($"Delete Endereco where identificador ={Identificador}");
            }
        }

    }
}