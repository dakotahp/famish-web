$(document).foundation();

$(document).ready(function() {
    moment().format();

    function buildTimezoneSelect(selector, data) {
      var select = selector, option_html = '';

      for(var i in data) {
        option_html += '<option>' + data[i] + '</option>';
      }
      select.append(option_html)
    }
    var timezones = moment.tz.names();

    window.parameters = {
      departure_timezone: 'America/Los_Angeles',
      destination_timezone: 'America/New_York'
    }

    buildTimezoneSelect($('#departure-timezone'), timezones)
    buildTimezoneSelect($('#destination-timezone'), timezones)

    $('form#departure-timezone-form, form#destination-timezone-form').submit(function() {
      var form = $(this);
      var element = form.find('.timezone');

      console.log(element.val())
      parameters[element.attr('data-parameter') + '_timezone'] = element.val()
      return false;
    })

    $('form#destination-time-form').submit(function() {
      var form = $(this);
      var hour = form.find('.hour').val()
      var minute = form.find('.minute').val()


      // set this time to destinatin timezone
      //var arrival_destination_morning_time = moment().hour(7).minute(0)
      var arrival_destination_morning_time = moment.tz('07:00', 'H:mm', parameters['destination_timezone'])



      var arrival_destination_time = moment.tz(hour + ':' + minute, 'H:mm', parameters['destination_timezone'])

      console.log(arrival_destination_morning_time.hour(), arrival_destination_time.hour())

      difference_between_arrival_time_and_morning = arrival_destination_morning_time - arrival_destination_time

      arrival_morning_time = arrival_destination_time.add( difference_between_arrival_time_and_morning )
      arrival_morning_time_in_local = arrival_morning_time.tz(parameters['departure_timezone'])

      //time_in_utc = moment(time_in_local).tz(parameters['destination_timezone'])

      // figure out morning time in destination TZ
      // then convert to UTC
      // then convert to local TZ


      console.log( arrival_destination_morning_time.diff(arrival_destination_time, 'hours'), arrival_morning_time )



      return false;
    })


    /*
    get departure timezone
    get destination timezone
    get destination time

    destination time = convert destination time to UTC
    morning = subtract 12 hours from time
    local_morning = morning converted to local timezone

    */
})
