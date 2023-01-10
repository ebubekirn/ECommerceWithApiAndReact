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
    public class VatRep<T> : BaseRepository<Vat>, IVatRep where T : class
    {
        public VatRep(TradeContext db) : base(db)
        {
        }
    }
}
