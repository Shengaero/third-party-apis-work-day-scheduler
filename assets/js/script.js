let now = moment();
__debugTimeSetToTestMode(); // TODO remove later
let scheduleTable = $('#schedule-table');

for(hour in data) {
    let time = moment();
    time.set({'hour': parseInt(hour), 'minute': 0, 'second': 0, 'millisecond': 0});
    createScheduleRow(time, data[hour]);
}

function createScheduleRow(time, event) {
    console.log(event);
    let hour = time.format('h a');
    let colorClass = time.hour() === now.hour()? 'bg-danger text-light': time.isBefore(now)? 'bg-light text-dark' : 'bg-success text-light';
    let scheduleRow = $('<div class="row">')
        .append($('<div class="p-0 align-middle col-auto w-10 border-top border-bottom">').text(hour))
        .append($('<div class="col ' + colorClass + '">').text('test'))
        .append($('<div class="col-auto w-10">'));

    scheduleTable.append(scheduleRow);
}

function __debugTimeSetToTestMode() {
    now.set({'hour': 12, 'minute': 0, 'second': 0, 'millisecond': 0});
}
