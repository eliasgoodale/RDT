import validate from './splunk-constraint'

const index = {
    "id": "8fs9cde",
    "index": "Galaxy_SWD",
    "location": "Galaxy",
    "status": "Test",
    "lastRun": "2017-05-04T11:30",
    "runStatus": "Failure",
    "entity": "SWD",
    "nextRun": "2017-05-04T11:30",
    "tags": [
      {
        "id": "t-01",
        "prefix": "NDGAL_",
        "historianTag": "NDGAL_DPIT_301.Value",
        "splunkTag": "DPIT_301.Value"
      },
      {
        "id": "t-02",
        "prefix": "NDGAL_",
        "historianTag": "NDGAL_FIT_20101.Temperature",
        "splunkTag": "FIT_20101.Temperature"
      },
      {
        "id": "t-03",
        "prefix": "NDSNS_",
        "historianTag": "NDSNS_FIT_221a.Total_Continuous",
        "splunkTag": "FIT_221a.Total_Continuous"
      }
    ]
  }

console.log(validate(index));
