using ETradeWithApi.Core;
using ETradeWithApi.Dto;
using ETradeWithApi.Entity.Concretes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeWithApi.Repos.Abstracts
{
    public interface IBasketDetailRep : IBaseRepository<BasketDetail>
    {
        List<BasketDetailDTO> BasketDetailDTOs(int MasterId); // Login olmuş user a ait Id çekilecek.
    }
}
