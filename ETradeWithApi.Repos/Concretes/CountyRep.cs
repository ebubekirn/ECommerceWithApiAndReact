using ETradeWithApi.Core;
using ETradeWithApi.Dal;
using ETradeWithApi.Dto;
using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Repos.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeWithApi.Repos.Concretes
{
    public class CountyRep<T> : BaseRepository<County>, ICountyRep where T : class
    {
        public CountyRep(TradeContext db) : base(db)
        {
        }

        public List<CountiesDTO> GetCountyDTO(int id)
        {
            return Set().Where(x => x.CityId == id).Select(x => new CountiesDTO { Id = x.Id, Description = x.Description }).ToList();

        }
    }
}
