

export default function fetchTimezoneInfo(){
    const currentDate = new Date();
    const timezoneOffsetMinutes = currentDate.getTimezoneOffset();
    const _offset = Math.abs(timezoneOffsetMinutes / 60);
    const offsetSign = _offset > 0 ? "+" : "-";
    const timeOffset = offsetSign + _offset;

    // Get the timezone name (e.g., "Pacific Standard Time")
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return { timeOffset, timezoneName };

}

const TIMES_ = [
    "12:00AM",
    "1:00AM",
    "2:00AM",
    "3:00AM",
    "4:00AM",
    "5:00AM",
    "6:00AM",
    "7:00AM",
    "8:00AM",
    "9:00AM",
    "10:00AM",
    "11:00AM",
    "12:00PM",
    "1:00PM",
    "2:00PM",
    "3:00PM",
    "4:00PM",
    "5:00PM",
    "6:00PM",
    "7:00PM",
    "8:00PM",
    "9:00PM",
    "10:00PM",
    "11:00PM",
]

export const formatTime = (time:any) => {
    return TIMES_[time]
};


const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const formatDay = (day:any) => {
    return days[day];
};