import "./contact.css";
import React from "react";
import { useSelector } from "react-redux";
export default function HotlineContact(props) {
  const appTheme = useSelector((state) => state.app.appTheme);


  return (
    <div>
      {appTheme.phone_number_hotline == null || 
        appTheme.phone_number_hotline === "" || appTheme.is_show_icon_hotline === false ? (
        ""
      ) : (<div className="hotline-phone-ring-wrap">
        <div className="hotline-phone-ring">
          <div className="hotline-phone-ring-circle"></div>
          <div className="hotline-phone-ring-circle-fill"></div>
          <div className="hotline-phone-ring-img-circle">
            {" "}
            <a href={"tel:" + appTheme.phone_number_hotline} className="pps-btn-img">
              {" "}
              <img
                src="/img/hotline/icon.png"
                alt="so dien thoai"
                width="50"
              />{" "}
            </a>
          </div>
        </div>
        <div className="hotline-bar">
          <a href={"tel:" + appTheme.phone_number_hotline}>
            {" "}
            <span className="text-hotline">{appTheme.phone_number_hotline}</span>{" "}
          </a>
        </div>
      </div>
      )}
      <div className="float-icon-hotline">
        <ul className="left-icon hotline">
          {appTheme == null || appTheme.id_zalo == null ||
            appTheme.id_zalo === "" || appTheme.is_show_icon_zalo === false ? (
            ""
          ) : (<li className="hotline_float_icon">
            <a
              target="_blank"
              rel="nofollow"
              id="messengerButton"
              href={"https://zalo.me/" + appTheme.id_zalo}
            >
              <i className="fa fa-zalo animated infinite tada"></i>
              <span>Zalo</span>
            </a>
          </li>)}
          {appTheme.id_facebook == null ||
            appTheme.id_facebook === "" || appTheme.is_show_icon_facebook === false ? (
            ""
          ) : (<li className="hotline_float_icon">
            <a
              target="_blank"
              rel="nofollow"
              id="messengerButton"
              href={"https://www.messenger.com/t/" + appTheme.id_facebook }
            >
              <i className="fa fa-messenger animated infinite tada"></i>
              <span>Facebook</span>
            </a>
          </li>
          )}
        </ul>
      </div>
    </div>
  );
}