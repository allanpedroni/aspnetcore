﻿using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo.API.Services
{
    public class CloudMailService : ILocalMailService
    {
        private ILogger<CloudMailService> _logger;

        public CloudMailService(ILogger<CloudMailService> logger)
        {
            _logger = logger;
        }

        private string _mailTo = "allan.pedroni@gmail.com";
        private string _mailFrom = "allan.pedroni@gmail.com";

        public void Send(string subject, string message)
        {
            _logger.LogInformation($"Email de {_mailFrom} para {_mailTo}, com a classe CloudMailService.");
            _logger.LogInformation($"Assunto {subject}");
            _logger.LogInformation($"Mensagem {message}");
        }
    }
}
