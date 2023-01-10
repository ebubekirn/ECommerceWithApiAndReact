using ETradeWithApi.Entity.Concretes;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeWithApi.Dal
{
    public class TradeContext : DbContext
    {
        public TradeContext(DbContextOptions<TradeContext> db) : base(db)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BasketDetail>()
                .HasKey(b => new { b.Id, b.ProductId });
            // https://www.learnentityframeworkcore.com/configuration/fluent-api/haskey-method
        }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<County> Counties { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Vat> Vats { get; set; }
        public DbSet<BasketDetail> BasketDetails { get; set; }
        public DbSet<BasketMaster> BasketMasters { get; set; }
    }
}
