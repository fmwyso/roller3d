var tokenClient;
var g_access_token = null;
var sheet_map = new Map();
var spreadsheetId = null;

function gapiStart() {
        gapi.client.init({
    }).then(function() {
        gapi.client.load('sheets', 'v4');
    }).then(function(response) {
        gisInit();
        console.log('discovery document loaded');
    }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
    });
}

function gapiLoad() {
    gapi.load('client', gapiStart)
}

function gisInit() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: '441029014764-tl4fr1os2p7hkdn5267jvp4k6f1v2cri.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        callback: (tokenResponse) => {
        g_access_token = tokenResponse.access_token;
        createSpreadsheet();
        },
    });
}

function get_token() {
    tokenClient.requestAccessToken();
}

function getTimeStampString() {
    let curDateTime = new Date();

    let year  = curDateTime.getFullYear().toString().padStart(4, '0');
    let day   = curDateTime.getDate().toString().padStart(2, '0');
    let month = (curDateTime.getMonth() + 1).toString().padStart(2, '0');

    let hour   = curDateTime.getHours();
    let am_pm  = "AM";

    if(hour >= 12){
        am_pm = "PM";

        if(hour > 12) {
            hour -= 12;
        }
    }

    hour = hour.toString().padStart(2, '0');

    let minute = curDateTime.getMinutes().toString().padStart(2, '0');
    let second = curDateTime.getSeconds().toString().padStart(2, '0');

    return day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second + " " + am_pm;
}

async function createSpreadsheet() { 
    let title = "Roller3D Log (" + getTimeStampString() + ")"
    var request = {
        properties: {
            title: title
        },
        sheets: [
            {
                properties: {
                    title: "Rolls",
                    gridProperties: {
                    columnCount: 4,
                    rowCount: 2, 
                    frozenRowCount: 1
                    },
                    tabColor: { 
                    red: 0.0,
                    green: 1.0,
                    blue: 0.0
                    },
                },
            },
            {
                properties: {
                    title: "Debug",
                    gridProperties: {
                    columnCount: 2,
                    rowCount: 2, 
                    frozenRowCount: 1
                    },
                    tabColor: { 
                    red: 0.0,
                    green: 0.0,
                    blue: 1.0
                    },
                },
            },           
        ],
    };

    var response = await window.gapi.client.sheets.spreadsheets.create(request);

    console.log(response);

    spreadsheetId = response.result.spreadsheetId;

    for (let sheet_idx = 0; sheet_idx < response.result.sheets.length; sheet_idx++) {
        sheet_map.set(response.result.sheets[sheet_idx].properties.title, response.result.sheets[sheet_idx].properties.sheetId);
    }

    writeHeaders(spreadsheetId, sheet_map.get("Rolls"), ["Rolled Timestamp", "Received Timestamp", "Name", "Reward"])
    writeHeaders(spreadsheetId, sheet_map.get("Debug"), ["Timestamp", "Info"])

    document.querySelector(".googleIntegrationDiv").innerHTML = '<a href="' + response.result.spreadsheetUrl + '" target="_blank" style="height:100px"><p>Now logging to spreadsheet: "' + title + "'. Click here to open spreadsheet.</p></a>";
    document.querySelector(".rollResultsDisplay").innerHTML = '<iframe src="' + response.result.spreadsheetUrl + '" style="height: 100%; width: 100%;" title="Google Sheets View"></iframe>';
}

async function writeHeaders(spreadsheetId, sheetId, values) { 
    let values_array = []

    for(let value_idx = 0; value_idx < values.length; ++value_idx) {
        values_array.push({userEnteredValue: {stringValue: values[value_idx]}})
    }

    var request = window.gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: spreadsheetId,
        "resource": {
            "requests": [
                {
                    "updateCells": {

                        "rows": 
                            {
                                values: values_array
                            }
                        ,
                        "fields": "*",
                        "range": {
                            "sheetId": sheetId,
                            "startRowIndex": 0,
                            "endRowIndex": 1,
                            "startColumnIndex": 0,
                            "endColumnIndex": values.length
                        }
                    },
                },
                {
                    "autoResizeDimensions": {
                        "dimensions": {
                        "sheetId": sheetId,
                        "dimension": "COLUMNS",
                        "startIndex": 0,
                        "endIndex": values.length
                        }
                    }
                }
            ]
        }
    });
        
    request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
}