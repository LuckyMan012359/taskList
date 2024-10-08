/* eslint-disable default-case */
import React, { useEffect, useRef, useState } from "react";
import { useOutsideAlerter } from "../../../hooks/useOutsideAlerter";
import { Calendar, theme } from "antd";
import dayjs from "dayjs";

export const DatePicker = ({ iniDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const onClose = () => setIsOpen(false);

  useOutsideAlerter(wrapperRef, onClose, [onClose]);

  const [date, setDate] = useState(dayjs(iniDate));
  const [dateState, setDateState] = useState("init");

  useEffect(() => {
    const today = dayjs().startOf("day");
    const tomorrow = dayjs().add(1, "day").startOf("day");
    const nextWeek = dayjs().add(7, "day").endOf("day");

    if (date.isSame(today, "day")) {
      setDateState("today");
    } else if (date.isSame(tomorrow, "day")) {
      setDateState("tomorrow");
    } else if (date.isBefore(nextWeek) && date.isAfter(today)) {
      setDateState("withinOneWeek");
    } else {
      setDateState("init");
    }
  }, [date]);

  const { token } = theme.useToken();

  const wrapperStyle = {
    width: 300,
    border: `2px solid ${token.colorBorderSecondary}`,
    boxShadow: "rgba(0, 0, 0, 0.8) 0px 0px 10px",
    borderRadius: token.borderRadiusLG,
    backgroundColor: "#fff",
    position: "absolute",
    left: "103%",
    display: "flex",
    flexDirection: "column",
    padding: 10,
  };

  const dayStyle = {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    justifyContent: "space-between",
  };

  const tabs = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "27%",
  };

  const onPanelChange = (value) => {
    console.log(value.format("YYYY-MM-DD"));
    setDate(value);
    onChange(value.format("YYYY-MM-DD"));
  };

  return (
    <div>
      {dateState === "init" ? (
        <div onClick={() => setIsOpen(true)}>{dateIcon}</div>
      ) : dateState === "today" ? (
        <div onClick={() => setIsOpen(true)}>{todayIcon}</div>
      ) : dateState === "tomorrow" ? (
        <div onClick={() => setIsOpen(true)}>{tomorrowIcon}</div>
      ) : (
        <div onClick={() => setIsOpen(true)}>{nextWeekIcon}</div>
      )}
      {isOpen && (
        <div style={wrapperStyle} ref={wrapperRef}>
          <Calendar value={date} fullscreen={false} onChange={onPanelChange} />

          <div style={dayStyle}>
            <div
              style={tabs}
              onClick={() => {
                const currentDate = dayjs(new Date());
                onChange(currentDate.format("YYYY-MM-DD"));
                setDate(currentDate);
              }}
            >
              {todayIcon}
              <p>Today</p>
            </div>
            <div
              style={tabs}
              onClick={() => {
                const currentDate = dayjs().add(1, "day");
                onChange(currentDate.format("YYYY-MM-DD"));
                setDate(currentDate);
              }}
            >
              {tomorrowIcon}
              <p>Tomorrow</p>
            </div>
            <div
              style={tabs}
              onClick={() => {
                const currentDate = dayjs().add(7, "day");
                onChange(currentDate.format("YYYY-MM-DD"));
                setDate(currentDate);
              }}
            >
              {nextWeekIcon}
              <p>Next Week</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const dateIcon = (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 8.80769C1.5 5.90674 1.5 4.45626 2.43726 3.55505C3.37452 2.65384 4.88301 2.65384 7.9 2.65384H11.1C14.117 2.65384 15.6255 2.65384 16.5627 3.55505C17.5 4.45626 17.5 5.90674 17.5 8.80769V10.3462C17.5 13.2471 17.5 14.6976 16.5627 15.5988C15.6255 16.5 14.117 16.5 11.1 16.5H7.9C4.88301 16.5 3.37452 16.5 2.43726 15.5988C1.5 14.6976 1.5 13.2471 1.5 10.3462V8.80769Z"
      stroke="black"
      stroke-opacity="0.08"
      stroke-width="1.5"
    />
    <path
      d="M5.5 2.65385V1.5"
      stroke="black"
      stroke-opacity="0.08"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M13.5 2.65385V1.5"
      stroke="black"
      stroke-opacity="0.08"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M1.89999 6.5H17.1"
      stroke="black"
      stroke-opacity="0.08"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M14.3 12.6538C14.3 13.0787 13.9418 13.4231 13.5 13.4231C13.0582 13.4231 12.7 13.0787 12.7 12.6538C12.7 12.229 13.0582 11.8846 13.5 11.8846C13.9418 11.8846 14.3 12.229 14.3 12.6538Z"
      fill="black"
      fill-opacity="0.08"
    />
    <path
      d="M14.3 9.57691C14.3 10.0017 13.9418 10.3461 13.5 10.3461C13.0582 10.3461 12.7 10.0017 12.7 9.57691C12.7 9.15208 13.0582 8.80768 13.5 8.80768C13.9418 8.80768 14.3 9.15208 14.3 9.57691Z"
      fill="black"
      fill-opacity="0.08"
    />
    <path
      d="M10.3 12.6538C10.3 13.0787 9.94184 13.4231 9.50001 13.4231C9.05818 13.4231 8.70001 13.0787 8.70001 12.6538C8.70001 12.229 9.05818 11.8846 9.50001 11.8846C9.94184 11.8846 10.3 12.229 10.3 12.6538Z"
      fill="black"
      fill-opacity="0.08"
    />
    <path
      d="M10.3 9.57691C10.3 10.0017 9.94184 10.3461 9.50001 10.3461C9.05818 10.3461 8.70001 10.0017 8.70001 9.57691C8.70001 9.15208 9.05818 8.80768 9.50001 8.80768C9.94184 8.80768 10.3 9.15208 10.3 9.57691Z"
      fill="black"
      fill-opacity="0.08"
    />
    <path
      d="M6.30001 12.6538C6.30001 13.0787 5.94184 13.4231 5.50001 13.4231C5.05818 13.4231 4.70001 13.0787 4.70001 12.6538C4.70001 12.229 5.05818 11.8846 5.50001 11.8846C5.94184 11.8846 6.30001 12.229 6.30001 12.6538Z"
      fill="black"
      fill-opacity="0.08"
    />
    <path
      d="M6.30001 9.57691C6.30001 10.0017 5.94184 10.3461 5.50001 10.3461C5.05818 10.3461 4.70001 10.0017 4.70001 9.57691C4.70001 9.15208 5.05818 8.80768 5.50001 8.80768C5.94184 8.80768 6.30001 9.15208 6.30001 9.57691Z"
      fill="black"
      fill-opacity="0.08"
    />
  </svg>
);

const todayIcon = (
  <svg
    width="22"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.61725 4.70871L3.50691 4.22104L3.61726 4.70871C3.64445 4.70256 3.67136 4.6965 3.69799 4.69051C4.14244 4.59051 4.50723 4.50843 4.80603 4.2816C5.1019 4.057 5.28599 3.7259 5.51435 3.31516C5.52801 3.2906 5.54182 3.26575 5.55583 3.24063L5.8016 2.79973C6.28474 1.93303 6.62061 1.33317 6.91935 0.943069C7.21784 0.55329 7.38471 0.5 7.5 0.5C7.61529 0.5 7.78216 0.55329 8.08065 0.943068C8.37939 1.33317 8.71526 1.93303 9.1984 2.79973L9.44417 3.24063C9.45818 3.26575 9.472 3.29061 9.48565 3.31517C9.71402 3.7259 9.8981 4.057 10.194 4.2816C10.4928 4.50843 10.8576 4.59051 11.302 4.69051C11.3286 4.6965 11.3555 4.70255 11.3827 4.70871L11.86 4.81669C12.7994 5.02924 13.4456 5.17691 13.8898 5.35198C14.3246 5.52334 14.4367 5.67161 14.4795 5.80927C14.524 5.95238 14.5136 6.15136 14.2542 6.56339C13.9914 6.98083 13.5495 7.49961 12.9099 8.24748L12.5846 8.62795C12.5667 8.64881 12.5491 8.6694 12.5316 8.68975C12.2259 9.0465 11.9823 9.33084 11.8707 9.68981C11.7596 10.0468 11.7964 10.4226 11.8431 10.8989C11.8457 10.9261 11.8484 10.9536 11.8511 10.9814L11.9003 11.489C11.9969 12.4862 12.0629 13.1794 12.0405 13.6805C12.0183 14.1807 11.9121 14.3416 11.8063 14.4219C11.7087 14.496 11.5474 14.5522 11.0959 14.4229C10.6381 14.2917 10.0319 14.0142 9.15236 13.6092L8.7055 13.4035L8.49639 13.8576L8.7055 13.4035C8.67941 13.3914 8.65361 13.3795 8.62809 13.3677C8.2145 13.1767 7.87244 13.0186 7.5 13.0186C7.12756 13.0186 6.7855 13.1767 6.37192 13.3677C6.34639 13.3795 6.3206 13.3914 6.2945 13.4035L5.84764 13.6092C4.96807 14.0142 4.36193 14.2917 3.90406 14.4229C3.45262 14.5522 3.29127 14.496 3.19368 14.4219C3.08793 14.3416 2.98175 14.1807 2.95946 13.6805C2.93714 13.1794 3.00309 12.4862 3.09972 11.489L3.14891 10.9814C3.1516 10.9536 3.15429 10.9261 3.15695 10.8989C3.20357 10.4226 3.24035 10.0468 3.12934 9.68981C3.01772 9.33085 2.77406 9.04651 2.46837 8.68977C2.45092 8.66941 2.43328 8.64881 2.41544 8.62796L2.09007 8.24748C1.45052 7.49961 1.00859 6.98083 0.745801 6.56339C0.486419 6.15136 0.476009 5.95238 0.520513 5.80927C0.563322 5.67161 0.675364 5.52334 1.11019 5.35198C1.55444 5.17691 2.20063 5.02924 3.13999 4.81669L3.61725 4.70871Z"
      stroke="#EF6C00"
    />
  </svg>
);

const tomorrowIcon = (
  <svg
    width="24"
    height="17"
    viewBox="0 0 18 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 8.30769C1 5.40673 1 3.95626 1.93726 3.05505C2.87452 2.15384 4.38301 2.15384 7.4 2.15384H10.6C13.617 2.15384 15.1255 2.15384 16.0627 3.05505C17 3.95626 17 5.40673 17 8.30769V9.84615C17 12.7471 17 14.1976 16.0627 15.0988C15.1255 16 13.617 16 10.6 16H7.4C4.38301 16 2.87452 16 1.93726 15.0988C1 14.1976 1 12.7471 1 9.84615V8.30769Z"
      stroke="#EF6C00"
    />
    <path d="M5 2.15385V1" stroke="#EF6C00" stroke-linecap="round" />
    <path d="M13 2.15385V1" stroke="#EF6C00" stroke-linecap="round" />
    <path
      d="M9.06016 8.68282V9.53047H5.16172V8.68282H9.06016ZM7.56797 7.08907V11.2297H6.65781V7.08907H7.56797ZM12.3492 6.09297V11.8H11.4078V7.21016L10.0133 7.68282V6.90547L12.2359 6.09297H12.3492Z"
      fill="#EF6C00"
    />
  </svg>
);

const nextWeekIcon = (
  <svg
    width="22"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.5 8.30769C0.5 5.40673 0.5 3.95626 1.43726 3.05505C2.37452 2.15384 3.88301 2.15384 6.9 2.15384H10.1C13.117 2.15384 14.6255 2.15384 15.5627 3.05505C16.5 3.95626 16.5 5.40673 16.5 8.30769V9.84615C16.5 12.7471 16.5 14.1976 15.5627 15.0988C14.6255 16 13.117 16 10.1 16H6.9C3.88301 16 2.37452 16 1.43726 15.0988C0.5 14.1976 0.5 12.7471 0.5 9.84615V8.30769Z"
      stroke="#EF6C00"
    />
    <path d="M4.5 2.15385V1" stroke="#EF6C00" stroke-linecap="round" />
    <path d="M12.5 2.15385V1" stroke="#EF6C00" stroke-linecap="round" />
    <path
      d="M8.16013 8.68282V9.53047H4.26169V8.68282H8.16013ZM6.66794 7.08907V11.2297H5.75779V7.08907H6.66794ZM12.6562 6.1125V6.62813L10.3828 11.8H9.3906L11.6601 6.8625H8.71482V6.1125H12.6562Z"
      fill="#EF6C00"
    />
  </svg>
);
