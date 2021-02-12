using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using TestePraticoDesenvolvedorTrainee.Models;

namespace Base
{
    public class Contexto : DbContext
    {
        public Contexto() : base("Connection")
        {

        }
        #region Access

        public DbSet<Loja> Loja { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Endereco> Endereco { get; set; }

        #endregion

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Cria o BD caso ele não exista !!
            Database.SetInitializer(new CreateDatabaseIfNotExists<Contexto>());

            //Remove do Entity a geração das tabelas com plural !!
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
