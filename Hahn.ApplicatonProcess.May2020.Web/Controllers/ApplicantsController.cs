using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hahn.ApplicatonProcess.May2020.Domain.Models;
using Hahn.ApplicatonProcess.May2020.Data.Context;
using Hahn.ApplicatonProcess.May2020.Domain.Services.Interfaces;

namespace Hahn.ApplicatonProcess.May2020.Web.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ApplicantsController : ControllerBase
    {
        private readonly IApplicantService _applicantService;
        public ApplicantsController(IApplicantService applicantService)
        {
            _applicantService = applicantService;
        }

        // GET: api/Applicants
        [HttpGet]
        public async Task<ActionResult<List<ApplicantDTO>>> Get()
        {
            var applicants = await _applicantService.GetApplicants();

            if (applicants == null)
            {
                return NotFound();
            }

            return applicants;
        }

        // GET: api/Applicants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicantDTO>> GetApplicant(int id)
        {
            ApplicantDTO applicant = await _applicantService.GetApplicantByIdAsync(id);

            if (applicant == null)
            {
                return NotFound();
            }

            return applicant;
        }

        // PUT: api/Applicants/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplicant(int id, ApplicantDTO applicant)
        {
            if (id != applicant.Id)
            {
                return BadRequest();
            }

            if(await _applicantService.UpdateApplicantAsync(applicant) == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Applicants
        [HttpPost]
        public async Task<ActionResult<ApplicantDTO>> PostApplicant(ApplicantDTO applicant)
        {
            applicant = await _applicantService.InsertApplicantAsync(applicant);
            return CreatedAtAction("GetApplicant", new { id = applicant.Id }, applicant);
        }

        // DELETE: api/Applicants/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApplicantDTO>> DeleteApplicant(int id)
        {
            var applicant = await _applicantService.DeleteApplicantByIdAsync(id);
            if (applicant == null)
            {
                return NotFound();
            }
            return applicant;
        }
    }
}
