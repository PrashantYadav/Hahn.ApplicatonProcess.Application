using Hahn.ApplicatonProcess.May2020.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Services.Interfaces
{
    public interface IApplicantService
    {
        Task<List<ApplicantDTO>> GetApplicants();
        Task<ApplicantDTO> GetApplicantByIdAsync(int id);        
        Task<ApplicantDTO> InsertApplicantAsync(ApplicantDTO applicant);
        Task<ApplicantDTO> UpdateApplicantAsync(ApplicantDTO applicant);
        Task<ApplicantDTO> DeleteApplicantByIdAsync(int id);

    }
}
