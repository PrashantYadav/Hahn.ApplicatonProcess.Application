using Hahn.ApplicatonProcess.May2020.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace Hahn.ApplicatonProcess.May2020.Data.Context
{
    public class HahnDbContext : DbContext
    {
        public HahnDbContext (DbContextOptions<HahnDbContext> options)
            : base(options)
        {
        }

        public DbSet<Applicant> Applicant { get; set; }
    }
}
