using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo.API.Services
{
    public class LocalMailService : ILocalMailService
    {
        private ILogger<LocalMailService> _logger;

        public LocalMailService(ILogger<LocalMailService> logger)
        {
            _logger = logger;
        }

        private string _mailTo = Startup.Configuration["mailSettings:mailToAddress"];
        private string _mailFrom = Startup.Configuration["mailSettings:mailFromAddress"];

        public void Send(string subject, string message)
        {
            _logger.LogInformation($"Email de {_mailFrom} para {_mailTo}, com a classe LocalMailService.");
            _logger.LogInformation($"Assunto {subject}");
            _logger.LogInformation($"Mensagem {message}");
        }
    }
}
