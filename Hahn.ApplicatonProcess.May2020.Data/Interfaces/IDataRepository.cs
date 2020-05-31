using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Data.Interfaces
{
    public interface IDataRepository<TEntity> where TEntity : class
    {
        void Insert(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        void Delete(int id);
        Task<List<TEntity>> GetAll();
        Task<TEntity> FindByIdAync(object id);
        Task<TEntity> SaveAsync(TEntity entity);
    }
}
