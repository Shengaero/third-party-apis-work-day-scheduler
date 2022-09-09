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

    let timeColumn = $('<div>')
            .attr('id', `col-time-${time.format('h-a')}`)
            .addClass(['align-middle', 'col-auto', 'w-10', 'border', 'border-left-0'])
            .text(time.format('h a'));

    let eventClasses = ['col', 'd-flex', 'pl-0', 'pr-0','text-light'];
    if(time.hour() === now.hour()) {
        eventClasses.push('bg-danger');
    } else if(time.isBefore(now)) {
        eventClasses.push('bg-secondary');
    } else {
        eventClasses.push('bg-success');
    }

    let eventColumn = $('<div>')
            .attr('id', `col-event-${time.format('h-a')}`)
            .addClass(eventClasses)
            .append($('<textarea>').addClass(['flex-fill', 'border-0']));
    // TODO Add input function

    let saveColumn = $('<div>')
            .attr('id', `col-save-${time.format('h-a')}`)
            .addClass(['col-auto', 'w-10', 'text-light', 'border', 'border-right-0']);

    let scheduleRow = $('<div>').addClass('row')
        .append(timeColumn)
        .append(eventColumn)
        .append(saveColumn);

    scheduleTable.append(scheduleRow);
}

function __debugTimeSetToTestMode() {
    now.set({'hour': 12, 'minute': 0, 'second': 0, 'millisecond': 0});
}
