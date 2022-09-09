// if there is no 'now', create one
// this is primarily for testing so another script can create their own time
if((typeof now) === 'undefined') {
    var now = moment();
}

let scheduleTable = $('#schedule-table'); // grab the schedule table to populate with rows

// this function will help generate columns in a less messy way
let generateScheduleColumn = (el, type, time) => el.attr('id', `col-${type}-${time.format('h-a')}`);

// function for generating a full row representing the schedule for a given hour.
function createScheduleRow(time, event) {
    // setup event column classes for the given row
    let eventClasses = ['col', 'd-flex', 'pl-2', 'pr-2', 'border-0', 'text-light'];
    // depending on what time it is, this will either be gray (past), red (present), or green (future)
    eventClasses.push(time.hour() === now.hour() ? 'bg-danger' : time.isBefore(now) ? 'bg-secondary' : 'bg-success');

    let timeColumn = generateScheduleColumn($('<div>'), 'time', time)               // create time column
        .text(time.format('h a'))                                                   // set text to show the hour represented by the row
        .addClass(['align-middle', 'col-auto', 'w-10', 'border', 'border-left-0'])  // add classes

    let eventColumn = generateScheduleColumn($('<textarea>'), 'event', time);   // create event column
    if(event) eventColumn.text(event);                                          // if there is previously saved content, we need to put it into the text area
    eventColumn.addClass(eventClasses);                                         // add classes

    let saveButton = generateScheduleColumn($('<button>'), 'save', time)                // create save column
        .append($('<i>').addClass(['fas', 'fa-save']))                                  // append floppy disk icon
        .on('click', clickSaveButton)                                                   // add on-click listener
        .addClass([                                                                     // add classes
            'btn', 'shadow-none', 'col-auto', 'd-flex', 'align-items-center',
            'w-10', 'text-light', 'border-right-0', 'rounded-0'
        ]);

    // create the schedule row, appending each column in the proper order
    let scheduleRow = $('<div>').addClass('row')
        .append(timeColumn)
        .append(eventColumn)
        .append(saveButton);

    // append the row to the table
    scheduleTable.append(scheduleRow);
}

// Will run when the save button is clicked
function clickSaveButton() {
    // TODO Implement
}

// iterate across each hour in an average 9-5 and create a row
for(hour in data) {
    // create a new moment and use that to manage the individual row in relation to the current time
    let time = moment();
    time.set({'hour': parseInt(hour), 'minute': 0, 'second': 0, 'millisecond': 0});
    // create the row
    createScheduleRow(time, data[hour]);
}
