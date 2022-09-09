// if there is no 'now', create one
// this is primarily for testing so another script can create their own time
if((typeof now) === 'undefined') {
    var now = moment();
}

let scheduleTable = $('#schedule-table'); // grab the schedule table to populate with rows

// this function will help generate columns in a less messy way
let generateScheduleColumn = (type, time) => $('<div>').attr('id', `col-${type}-${time.format('h-a')}`);

// function for generating a full row representing the schedule for a given hour.
function createScheduleRow(time, event) {
    // setup event column classes for the given row
    let eventClasses = ['col', 'd-flex', 'pl-0', 'pr-0', 'text-light'];
    // depending on what time it is, this will either be gray (past), red (present), or green (future)
    eventClasses.push(time.hour() === now.hour() ? 'bg-danger' : time.isBefore(now) ? 'bg-secondary' : 'bg-success');
    // create the text area for each event column
    let eventTextArea = $('<textarea>').addClass(['flex-fill', 'border-0']);
    // if there is previously saved content, we need to grab that and put it into the text area when the page loads
    if(event) {
        console.log(event); // TODO remove this
        eventTextArea.text(event); // set text to event
    }
    // create save button for save column
    let saveButton = $('<button>')
        .addClass(['btn', 'flex-fill'])
        .append($('<i>').addClass(['fas', 'fa-save']));
    // create time column
    let timeColumn = generateScheduleColumn('time', time)
        .addClass(['align-middle', 'col-auto', 'w-10', 'border', 'border-left-0'])
        .text(time.format('h a'));
    // create event column
    let eventColumn = generateScheduleColumn('event', time)
        .addClass(eventClasses)
        .append(eventTextArea);
    // TODO Add input function
    // create save column
    let saveColumn = generateScheduleColumn('save', time)
        .addClass(['col-auto', 'd-flex', 'align-items-center', 'w-10', 'text-light', 'border', 'border-right-0'])
        .append(saveButton);
    // create the schedule row, appending each column in the proper order
    let scheduleRow = $('<div>').addClass('row')
        .append(timeColumn)
        .append(eventColumn)
        .append(saveColumn);
    // append the row to the table
    scheduleTable.append(scheduleRow);
}

// iterate across each hour in an average 9-5 and create a row
for(hour in data) {
    // create a new moment and use that to manage the individual row in relation to the current time
    let time = moment();
    time.set({'hour': parseInt(hour), 'minute': 0, 'second': 0, 'millisecond': 0});
    // create the row
    createScheduleRow(time, data[hour]);
}
