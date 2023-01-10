using ETradeWithApi.Core;
using ETradeWithApi.Dal;
using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Repos.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeWithApi.Repos.Concretes
{
    public class BasketMasterRep<T> : BaseRepository<BasketMaster>, IBasketMasterRep where T : class
    {
        public BasketMasterRep(TradeContext db) : base(db)
        {
        }
    }
}
