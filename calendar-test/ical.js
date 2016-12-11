(function () {
    'use strict';

    var _ = require('lodash');

    var VCalendar = function (calName, calScale, version, method, prodId) {
        this._headers = [
            {
                key: 'BEGIN',
                value: 'VCALENDAR'
            },
            {
                key: 'CALSCALE',
                value: calScale || 'GREGORIAN'
            },
            {
                key: 'VERSION',
                value: version || '2.0'
            },
            {
                key: 'X-WR-CALNAME',
                value: calName
            },
            {
                key: 'METHOD',
                value: method || 'PUBLISH'
            },
            {
                key: 'PRODID',
                value: prodId
            }
        ];
        this._events = [];
        this._footer = [
            {
                key: 'END',
                value: 'VCALENDAR'
            }
        ];
    };

    var _formatDate = function (date, isAllDay) {
        var noMsDate = new Date(date.getTime());
        noMsDate.setMilliseconds(0);
        var noMsDateISOString = noMsDate.toISOString();
        var icsDateString = noMsDateISOString.replace(/-/g, '').replace(/:/g, '').replace(/\.000/g, '');
        return isAllDay ? icsDateString.substring(0, icsDateString.indexOf('T')) : icsDateString;
    };

    var VEvent = function (id,
                           startDate, endDate, isAllDay,
                           name, description, location, visibility, category,
                           orgnizer, attendees,
                           createdDate, lastModifiedDate) {
        var self = this;
        self._headers = [
            {
                key: 'BEGIN',
                value: 'VEVENT'
            }
        ];
        self._props = [
            {
                key: 'TRANSP',
                value: 'TRANSPARENT'
            },
            {
                key: 'UID',
                value: id
            },
            {
                key: 'DTSTAMP',
                value: _formatDate(startDate, false)
            },
            {
                key: 'DTSTART' + (isAllDay ? ';VALUE=DATE' : ''),
                value: _formatDate(startDate, isAllDay)
            },
            {
                key: 'DTEND' + (isAllDay ? ';VALUE=DATE' : ''),
                value: _formatDate(endDate, isAllDay)
            },
            {
                key: 'SUMMARY',
                value: name
            },
            {
                key: 'DESCRIPTION',
                value: description
            },
            {
                key: 'LOCATION',
                value: location
            },
            {
                key: 'CLASS',
                value: visibility || 'PUBLIC'
            },
            {
                key: 'CATEGORIES',
                value: category
            },
            {
                key: 'STATUS',
                value: 'CONFIRMED'
            },
            {
                key: 'SEQUENCE',
                value: 0
            },
            {
                key: 'CREATED',
                value: _formatDate(createdDate, false)
            },
            {
                key: 'LAST-MODIFIED',
                value: _formatDate(lastModifiedDate, false)
            },
            {
                key: 'ORGANIZER;CN=' + orgnizer.name,
                value: orgnizer.email
            }
        ];
        _.forEach(attendees, function (attendee) {
            self._props.push({
                key: 'ATTENDEE;CN=' + attendee.name,
                value: attendee.email
            });
        });
        self._alarms = [];
        self._footer = [
            {
                key: 'END',
                value: 'VEVENT'
            }
        ];
    };

    VEvent.prototype.addAlarm = function (id, trigger, description, action) {
        var self = this;
        var alarm = [
            {
                key: 'BEGIN',
                value: 'VALARM'
            },
            {
                key: 'X-WR-ALARMUID',
                value: id
            },
            {
                key: 'UID',
                value: id
            },
            {
                key: 'TRIGGER',
                value: trigger
            },
            {
                key: 'DESCRIPTION',
                value: description
            },
            {
                key: 'ACTION',
                value: action || 'DISPLAY'
            },
            {
                key: 'END',
                value: 'VALARM'
            }
        ];
        self._alarms.push(alarm);
    };

    VCalendar.prototype.addEvent = function (id,
                                             startDate, endDate, isAllDay,
                                             name, description, location, visibility, category,
                                             orgnizer, attendees,
                                             createdDate, lastModifiedDate) {
        var self = this;
        var event = new VEvent(id,
            startDate, endDate, isAllDay,
            name, description, location, visibility, category,
            orgnizer, attendees,
            createdDate, lastModifiedDate);
        self._events.push(event);
        return event;
    };

    VCalendar.prototype._toICSLine = function (key, value) {
        if (_.isEmpty(key) || _.isEmpty(value)) {
            return null;
        }
        else {
            value = _.isString(value) ? value : value.toString();

            key = key.replace(/[\\;,\n]/g, function (match) {
                return (match === '\n' ? '\\n' : ('\\' + match));
            });
            value = value.replace(/[\\;,\n]/g, function (match) {
                return (match === '\n' ? '\\n' : ('\\' + match));
            });
            return key + ':' + value;
        }
    };

    VCalendar.prototype.toICSString = function () {
        var self = this;
        var lines = [];
        var line = null;
        _.forEach(self._headers, function (header) {
            line = self._toICSLine(header.key, header.value);
            if (!_.isEmpty(line)) {
                lines.push(line);
            }
        });
        _.forEach(self._events, function (event) {
            _.forEach(event._headers, function (header) {
                line = self._toICSLine(header.key, header.value);
                if (!_.isEmpty(line)) {
                    lines.push(line);
                }
            });
            _.forEach(event._props, function (prop) {
                line = self._toICSLine(prop.key, prop.value);
                if (!_.isEmpty(line)) {
                    lines.push(line);
                }
            });
            _.forEach(event._alarms, function (alarm) {
                _.forEach(alarm, function (prop) {
                    line = self._toICSLine(prop.key, prop.value);
                    if (!_.isEmpty(line)) {
                        lines.push(line);
                    }
                });
            });
            _.forEach(event._footer, function (footer) {
                line = self._toICSLine(footer.key, footer.value);
                if (!_.isEmpty(line)) {
                    lines.push(line);
                }
            });
        });
        _.forEach(self._footer, function (footer) {
            line = self._toICSLine(footer.key, footer.value);
            if (!_.isEmpty(line)) {
                lines.push(line);
            }
        });
        return lines.join('\r\n');
    };

    module.exports.createNew = function (calName, calScale, version, method, prodId) {
        return new VCalendar(calName, calScale, version, method, prodId);
    };

})();
