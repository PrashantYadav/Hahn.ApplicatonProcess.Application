using FluentValidation;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Models.Validators
{
    public class ApplicantValidator : AbstractValidator<ApplicantDTO>
    {
        private readonly HttpClient _client;

        public ApplicantValidator(HttpClient client)
        {
            _client = client;
            RuleFor(x => x.Name).MinimumLength(5).WithMessage("Name should have minimum 5 characters");
            RuleFor(x => x.FamilyName).MinimumLength(5).WithMessage("Family name should have minimum 5 characters");
            RuleFor(x => x.Address).MinimumLength(10).WithMessage("Address should have minimum 10 characters");
            RuleFor(x => x.CountryOfOrigin).MustAsync(async (countryOfOrigin, cancellation) =>
            {
                return await IsCountryValid(countryOfOrigin);
            }).WithMessage("Country of Origin should be a valid country");
            RuleFor(x => x.Age).InclusiveBetween(20, 60).WithMessage("Age should be between 20 to 60 inclusive");
            RuleFor(x => x.EMailAdress).EmailAddress().WithMessage("Email should be valid");
            RuleFor(x => x.Hired).NotNull().WithMessage("Hired should be not null");
        }

        private async Task<bool> IsCountryValid(string countryName)
        {
            var baseUrl = string.Format("https://restcountries.eu/rest/v2/name/{0}?fields=name", countryName);
            var httpResponse = await _client.GetAsync(baseUrl);

            if (!httpResponse.IsSuccessStatusCode)
            {
                return false;
            }

            var content = await httpResponse.Content.ReadAsStringAsync();
            var countryNameFromApi = JsonConvert.DeserializeObject<string>(content);

            return countryNameFromApi != null;
        }
    }
}
