﻿using ETradeWithApi.Core;
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
    public class UsersRep<T> : BaseRepository<Users>, IUsersRep where T : class
    {
        TradeContext _db;
        public UsersRep(TradeContext db) : base(db)
        {
            _db = db;
        }

        public Users CreateUser(Users u)
        {
            Users selectedUser = _db.Set<Users>().FirstOrDefault(x => x.Mail == u.Mail);
            if (selectedUser == null)
            {
                int salt = 12;
                u.Password = BCrypt.Net.BCrypt.HashPassword(u.Password, salt);
                u.Error = false;
            }
            else
            {
                u.Error = true;
            }
            return u;
        }

 

        public UserDTO Login(string username, string password)
        {
            Users selectedUser = _db.Set<Users>().FirstOrDefault(x => x.Mail == username);
            UserDTO user = new UserDTO();
            if (selectedUser != null)
            {
                bool verified = BCrypt.Net.BCrypt.Verify(password, selectedUser.Password);
                if (verified == true)
                {
                    user.Id = selectedUser.Id;
                    user.Mail = selectedUser.Mail;
                    user.Role = selectedUser.Role;
                    user.Error = false;
                }
                else
                {
                    user.Error = true;
                }
            }
            else
            {
                user.Error = true;
            }
            return user;
        }
    }
}
