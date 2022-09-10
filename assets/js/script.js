// if there is no 'now', create one
// this is primarily for testing so another script can create their own time
if((typeof now) === 'undefined') {
    var now = moment();
}

let currentDay = $('#current-day'); // element that will display the current day to the user
let clearScheduleButton = $('#clear-schedule-button'); // button to clear schedule
let scheduleTable = $('#schedule-table'); // grab the schedule table to populate with rows

// this function will help generate columns in a less messy way
let generateScheduleColumn = (el, type, time) => el.attr('id', `col-${type}-${time.format('h-a')}`);

// function for generating a full row representing the schedule for a given hour.
function createScheduleRow(time, event) {
    // setup event column classes for the given row
    let eventClasses = ['col', 'd-flex', 'pl-2', 'pr-2', 'border-0', 'text-light'];
    // depending on what time it is, this will either be gray (past), red (present), or green (future)
    eventClasses.push(time.hour() === now.hour() ? 'bg-danger' : time.isBefore(now) ? 'bg-secondary' : 'bg-success');

    let timeColumn = generateScheduleColumn($('<div>'), 'time', time)   // create time column
        .append($('<p>').text(time.format('h a')))                      // set text to show the hour represented by the row
        .addClass([                                                     // add classes
            'd-flex', 'align-items-center', 'justify-content-center',
            'col-auto', 'w-10', 'border', 'border-left-0'
        ]);

    let eventColumn = generateScheduleColumn($('<textarea>'), 'event', time)    // create event column
        .on('change', () => eventColumn.val(eventColumn.val().trim()));         // listen for changes to text so that we can trim unnecessary whitespace
    if(event) eventColumn.text(event);                                          // if there is previously saved content, we need to put it into the text area
    eventColumn.addClass(eventClasses);                                         // add classes

    let saveButton = generateScheduleColumn($('<button>'), 'save', time)    // create save column
        .append($('<i>').addClass(['fas', 'fa-save']))                      // append floppy disk icon
        .on('click', clickSaveButton)                                       // add on-click listener
        .addClass([                                                         // add classes
            'btn', 'shadow-none', 'col-auto', 'd-flex', 'justify-content-center',
            'align-items-center', 'w-10', 'text-light', 'border-right-0', 'rounded-0'
        ]);

    // create the schedule row, appending each column in the proper order
    let scheduleRow = $('<div>').addClass('row')
        .attr('data-hour', time.hour()) // set a data attribute for helping us save later
        .append(timeColumn)
        .append(eventColumn)
        .append(saveButton);

    // append the row to the table
    scheduleTable.append(scheduleRow);
}

// will run when the save button is clicked
function clickSaveButton() {
    let scheduleRow = $(this).parent();             // get the schedule row this save column is part of
    let eventColumn = scheduleRow.find('textarea'); // then the event column that's part of the schedule row
    let event = eventColumn.val();                  // grab the text in the textarea
    setData(scheduleRow.attr('data-hour'), event);  // set the event data of the hour
    saveData();                                     // save data
}

// this will initialize tooltips
$(() => {
    $('[data-toggle="tooltip"]').tooltip();
});

// clear button functionality 
clearScheduleButton.on('click', () => {
    let textareas = scheduleTable.find('.row textarea');
    textareas.val('');
    for(let i = 0; i < textareas.length; i++) {
        let textarea = textareas[i];
        let hour = $(textarea).parent().attr('data-hour');
        setData(hour, '');
    }
    saveData();
});

// set text for current day
currentDay.text(now.format('dddd, MMMM Do YYYY'));

// iterate across each hour in an average 9-5 and create a row
for(hour in data) {
    // create a new moment and use that to manage the individual row in relation to the current time
    let time = moment();
    time.set({'hour': parseInt(hour), 'minute': 0, 'second': 0, 'millisecond': 0});
    // create the row
    createScheduleRow(time, data[hour]);
}
