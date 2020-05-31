using Hahn.ApplicatonProcess.May2020.Data.Context;
using Hahn.ApplicatonProcess.May2020.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Data.Implementations
{
    public class DataRepository<TEntity> : IDataRepository<TEntity> where TEntity : class
    {
        internal HahnDbContext _context;
        internal DbSet<TEntity> DbSet;

        public DataRepository(HahnDbContext context)
        {
            _context = context;
            DbSet = context.Set<TEntity>();
        }

        public async Task<List<TEntity>> GetAll()
        {
            return await DbSet.ToListAsync();
        }

        public async Task<TEntity> FindByIdAync(object id)
        {
            return await (DbSet as DbSet<TEntity>).FindAsync(id);
        }

        public void Insert(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public void Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            DbSet.Update(entity);
        }

        public void Delete(int id)
        {
            var entity = DbSet.Find(id);
            Delete(entity);
        }

        public void Delete(TEntity entity)
        {
            DbSet.Attach(entity);
            DbSet.Remove(entity);
        }

        public async Task<TEntity> SaveAsync(TEntity entity)
        {
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
