using ETradeWithApi.Core;
using ETradeWithApi.Dal;
using ETradeWithApi.Dto;
using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Repos.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ETradeWithApi.Repos.Concretes
{
    public class BasketDetailRep<T> : BaseRepository<BasketDetail>, IBasketDetailRep where T : class
    {
        public BasketDetailRep(TradeContext db) : base(db)
        {
        }

        public List<BasketDetailDTO> BasketDetailDTOs(int MasterId)
        {
            return Set().Where(x=> x.Id== MasterId).Select(x=> new BasketDetailDTO
            {
                Id = x.Id,
                ProductId= x.ProductId,
                ProductName = x.Products.ProductName,
                UnitPrice= x.Products.UnitPrice,
                UnitName = x.Unit.Description,
                Amount = x.Amount,
                Vat = x.Ratio,
                Total = (x.Amount*x.UnitPrice)*((x.Ratio/100)+1)
            }).ToList();
        }
    }
}
