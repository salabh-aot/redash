import React, { useCallback, useMemo, useState } from "react";
import * as moment from "moment";
import { extendMoment } from "moment-range";

import "./Calendar.css";
import Month from "./components/Month";
// import { events } from "./events";
import { RendererPropTypes } from "../prop-types";

const extendedMoment = extendMoment(moment);

export default function Renderer(props: any) {
  const prevMonth = extendedMoment.default().subtract(1, "months");
  const lastMonth = extendedMoment.default().endOf("year");
  const monthRange = extendedMoment.range(prevMonth, lastMonth).snapTo("month");
  const months = Array.from(monthRange.by("month"));
  const events = props.data.rows;

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const monthEvents: any = useMemo(() => {
    let monthData: any = {};
    months.forEach((month: any) => {
      const data = events.filter(
        (e: any) =>
          (extendedMoment.default(e.start_date).year() === month.year() &&
            extendedMoment.default(e.start_date).month() === month.month()) ||
          (extendedMoment.default(e.end_date).year() === month.year() &&
            extendedMoment.default(e.end_date).month() === month.month())
      );
      monthData[month.format("MMMM")] = data;
    });
    return monthData;
  }, [months]);

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        <span className="title">Week 1</span>
        <span className="title">Week 2</span>
        <span className="title">Week 3</span>
        <span className="title">Week 4</span>
        <span className="title">Week 5</span>
        <span className="title">Week 6</span>
        {[1, 2, 3, 4, 5, 6].map(n =>
          days.map((d, i) => (
            <div className="week-day" key={`week${n}_${d}_${i}`}>
              {days[i]}
            </div>
          ))
        )}

        {months.map(month => (
          <Month
            month={month}
            numTasks={Math.floor(Math.random() * (5 - 1)) + 2}
            key={month.toString()}
            events={monthEvents ? monthEvents[month.format("MMMM")] : []}
            setHoveredEvent={setHoveredEvent}
            hoveredEvent={hoveredEvent}
          />
        ))}
      </div>
    </div>
  );
}

// export default Calendar;

Renderer.propTypes = RendererPropTypes;
