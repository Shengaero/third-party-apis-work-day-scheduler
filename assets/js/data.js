var data = {
    '9': undefined,
    '10': undefined,
    '11': undefined,
    '12': undefined,
    '13': undefined,
    '14': undefined,
    '15': undefined,
    '16': undefined,
    '17': undefined
};

function __clearData() {
    localStorage.removeItem('schedule_data');
}

function saveData() {
    localStorage.setItem('schedule_data', JSON.stringify(data));
}

function setData(hour, value) {
    data[hour.toString()] = value;
}

let scheduleDataString = localStorage.getItem('schedule_data');
if(scheduleDataString !== null) {
    console.log('loading data...');
    JSON.parse(scheduleDataString, (key, value) => {
        if(key !== "") {
            data[key] = value;
        }
    });
    console.log('data loaded!');
} else {
    saveData();
}
