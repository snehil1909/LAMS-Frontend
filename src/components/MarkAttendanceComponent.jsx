import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "./MarkAttendanceComponent.css";

const MarkAttendanceComponent = () => {
  const { userId } = useParams();
  const [attendanceDates, setAttendanceDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statusMsg, setStatusMsg] = useState("");

  // Fetch attendance history for the current month
  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // JS months are 0-based
    axios
      .get(`http://192.168.47.133:5000/api/employee/${userId}/attendance/history?year=${year}&month=${month}`)
      .then((res) => setAttendanceDates(res.data)) // { "2024-06-01": "PRESENT", ... }
      .catch(() => setAttendanceDates({}));
  }, [userId, selectedDate]);

  // Mark attendance for today
  const handleMarkAttendance = () => {
    axios
      .post(`http://192.168.47.133:5000/api/employee/${userId}/attendance/mark`)
      .then(() => {
        setStatusMsg("Attendance marked successfully!");
        // Refresh attendance after marking
        setTimeout(() => setStatusMsg(""), 2000);
      })
      .catch((err) => {
        setStatusMsg(err.response?.data || "Failed to mark attendance.");
        setTimeout(() => setStatusMsg(""), 2000);
      });
  };

  // Calendar tile coloring
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const yyyyMMdd = date.toISOString().slice(0, 10);
      const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
      const day = date.getDay();

      // Get the current month and year
      const currentMonth = selectedDate.getMonth();
      const currentYear = selectedDate.getFullYear();

      // Check if the date belongs to the current month
      if (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear) {
        return ""; // Do not mark days outside the current month
      }

      if (day === 0 || day === 6) return ""; // Weekend: no color
      if (attendanceDates[yyyyMMdd] === "PRESENT") return "present";
      if (yyyyMMdd < today && !attendanceDates[yyyyMMdd]) return "absent"; // Mark as absent only if the date is in the past and not marked as present
    }
    return "";
  };

  return (
    <div className="attendance-container">
      <h2 className="form-title">Mark Attendance</h2>
      <button className="btn-attendance" onClick={handleMarkAttendance}>
        Mark Attendance
      </button>
      {statusMsg && <div className="status-msg">{statusMsg}</div>}
      <div className="calendar-section">
        <Calendar
          value={selectedDate}
          onActiveStartDateChange={({ activeStartDate }) => setSelectedDate(activeStartDate)}
          tileClassName={tileClassName}
        />
        <div className="legend">
          <span className="legend-item present"></span> Present
          <span className="legend-item absent"></span> Absent
        </div>
      </div>
    </div>
  );
};

export default MarkAttendanceComponent;