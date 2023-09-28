using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ProEventos.Domain.Identity
{
    public class UserRole
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}