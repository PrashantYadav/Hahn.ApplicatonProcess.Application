using ExpressMapper.Extensions;
using Hahn.ApplicatonProcess.May2020.Data.Entity;
using Hahn.ApplicatonProcess.May2020.Data.Interfaces;
using Hahn.ApplicatonProcess.May2020.Domain.Models;
using Hahn.ApplicatonProcess.May2020.Domain.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Services.Implementations
{
    public class ApplicantService : IApplicantService
    {
        private readonly IDataRepository<Applicant> _applicantRepository;
        public ApplicantService(IDataRepository<Applicant> applicantRepository)
        {
            _applicantRepository = applicantRepository;
        }

        public async Task<List<ApplicantDTO>> GetApplicants()
        {
            var entities = await _applicantRepository.GetAll();
            if (entities == null)
            {
                return null;
            }
            var result = new List<ApplicantDTO>();
            foreach(var item in entities)
            {
                result.Add(item.Map<Applicant, ApplicantDTO>());
            }
            return result;
        }

        public async Task<ApplicantDTO> GetApplicantByIdAsync(int id)
        {
            var entity =  await _applicantRepository.FindByIdAync(id);
            if (entity == null)
            {
                return null;
            }
            return entity.Map<Applicant, ApplicantDTO>();
        }

        public async Task<ApplicantDTO> InsertApplicantAsync(ApplicantDTO applicant)
        {
            var dto = applicant.Map<ApplicantDTO, Applicant>();
            _applicantRepository.Insert(dto);
            var entity = await _applicantRepository.SaveAsync(dto);
            return entity.Map<Applicant, ApplicantDTO>();
        }

        public async Task<ApplicantDTO> UpdateApplicantAsync(ApplicantDTO applicant)
        {
            var entity = await _applicantRepository.FindByIdAync(applicant.Id);
            if (entity == null)
            {
                return null;
            }
            var dto = applicant.Map<ApplicantDTO, Applicant>();
            _applicantRepository.Update(dto);
            entity = await _applicantRepository.SaveAsync(dto);
            return entity.Map<Applicant, ApplicantDTO>();
        }

        public async Task<ApplicantDTO> DeleteApplicantByIdAsync(int id)
        {
            var entity = await _applicantRepository.FindByIdAync(id);
            if (entity == null)
            {
                return null;
            }
            _applicantRepository.Delete(id);
            await _applicantRepository.SaveAsync(entity);
            return entity.Map<Applicant, ApplicantDTO>();
        }
    }
}
