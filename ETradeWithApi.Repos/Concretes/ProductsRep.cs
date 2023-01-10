using ETradeWithApi.Core;
using ETradeWithApi.Dal;
using ETradeWithApi.Dto;
using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Repos.Abstracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeWithApi.Repos.Concretes
{
    public class ProductsRep<T> : BaseRepository<Products>, IProductsRep where T : class
    {
        public ProductsRep(TradeContext db) : base(db)
        {
        }

        public Products FindWithVat(int Id)
        {
            return Set().Where(x => x.Id == Id).Include(x => x.Vat).FirstOrDefault();
        }

        public List<ProductsDTO> GetProductsSelect()
        {
            return Set().Select(x => new ProductsDTO { Id = x.Id, ProductName = x.ProductName }).ToList();
        }

        

    }
}
