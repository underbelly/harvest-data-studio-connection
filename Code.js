function getConfig(request) {
  var config = {
    configParams: [
      {
        name: 'HarvestAccountId',
        displayName: 'Harvest Account ID',
        helpText: 'You need to get the account id from Harvest',
        placeholder: 'xxxxxx'
      },
      {
        name: 'HarvestToken',
        displayName: 'Harvest Token',
        helpText: 'You need to get the token from Harvest',
        placeholder: 'xxxxxx'
      }      
    ]
  };
  
  return config;
}

var fixedSchema = [
  {
    name: 'Hours',
    label: 'Hours',
    description: 'Amount of hours clocked',
    group: 'hours',
    dataType: 'NUMBER',
  },
];

function getSchema(request) {
  return {schema: fixedSchema};
}

function getData(request) {
  var url = 'https://api.harvestapp.com/v2/time_entries?from=2018-09-18&to=2018-09-18';
  var config = {
    headers: {
      'Authorization': 'Bearer ' + request.configParams.HarvestToken,
      'Harvest-Account-ID': request.configParams.HarvestId
    }
  };

  var response = UrlFetchApp.fetch(url, config);
  var timeEntries = response.getContentText();
  var dataSchema = [];

  var data = [];

  return {
    schema: dataSchema,
    rows: data
  };
}
