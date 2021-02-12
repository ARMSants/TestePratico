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
    public class Cliente
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Identificador { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public string RG { get; set; }
        public DateTime DataNascimento { get; set; }
        public bool Ativo { get; set; }
        public List<Loja> Lojas { get; set; }
        public List<Endereco> Enderecos { get; set; }

        public static List<Cliente> ListarClientes()
        {
            Contexto ctx = new Contexto();
            var clientes = ctx.Cliente.Where(m => m.Ativo == true).ToList();
            return clientes;
        }

        public static Cliente SelecionarCliente(int Identificador)
        {



            using (Contexto ctx = new Contexto())
            {
                Cliente cliente = ctx.Cliente.FirstOrDefault(m => m.Identificador == Identificador);

                using (TestePraticoDataContext dtc = new TestePraticoDataContext())
                {
                    var enderecos = dtc.ExecuteQuery<Endereco>($@"select Endereco.* from Endereco where IdentificadorCliente = {Identificador}").ToList();
                    cliente.Enderecos = enderecos;
                    var lojas = dtc.ExecuteQuery<Loja>($@"select Loja.* from Loja inner join Loja_has_Cliente on Loja_has_Cliente.IdentificadorLoja = Loja.Identificador and IdentificadorCliente = {Identificador}").ToList();
                    cliente.Lojas = lojas;
                }

                return cliente;
            }
        }

        public static void Inserir(Cliente cliente)
        {
            using (Contexto ctx = new Contexto())
            {
                cliente.Ativo = true;
                ctx.Cliente.Add(cliente);
                ctx.SaveChanges();
            }
        }

        public static void Alterar(Cliente cliente)
        {
            using (Contexto ctx = new Contexto())
            {
                cliente.Ativo = true;
                ctx.Entry(cliente).State = EntityState.Modified;
                ctx.SaveChanges();
            }
        }
        public static void IncluirClienteLoja(int IdLoja, int IdCliente)
        {
            using (TestePraticoDataContext dtc = new TestePraticoDataContext())
            {
                dtc.ExecuteCommand($"Insert into Loja_has_Cliente (IdentificadorLoja, IdentificadorCliente) Values ({IdLoja} ,{IdCliente})");
            }
        }
        public static void ApagarClienteLoja(int IdLoja, int IdCliente)
        {
            using (TestePraticoDataContext dtc = new TestePraticoDataContext())
            {
                dtc.ExecuteCommand($"Delete Loja_has_Cliente where IdentificadorLoja = {IdLoja} and IdentificadorCliente = {IdCliente}");
            }
        }

        public static void Apagar(int Identificador)
        {
            using (Contexto ctx = new Contexto())
            {
                Cliente cliente = ctx.Cliente.FirstOrDefault(m => m.Identificador == Identificador);
                if (cliente != null)
                {
                    cliente.Ativo = false;
                    ctx.Entry(cliente).State = EntityState.Modified;
                    ctx.SaveChanges();
                }
            }
        }

    }
}