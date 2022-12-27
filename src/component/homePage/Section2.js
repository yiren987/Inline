import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import GroupsIcon from "@mui/icons-material/Groups";

export const Section2 = () => {
  return (
    <section id="about" className="about">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-5 col-lg-6 d-flex justify-content-center align-items-stretch img-boxes"></div>

          <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
            <h3>Did you ever feel you cannot manage your time?</h3>
            <p>
              Well, you are at the right place! Here at inline our application
              helps you keep track of all the things you need to do at one
              place. You can label your task with colors and group them
              together.
            </p>

            <div className="icon-box" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon">
                <EventNoteIcon />
              </div>
              <h4 className="title">
                <p>Functional scheduler</p>
              </h4>
              <p className="description">
                You will have the abilities to view tasks and able to label
                them!
              </p>
            </div>

            <div className="icon-box" data-aos="zoom-in" data-aos-delay="200">
              <div className="icon">
                <TravelExploreIcon />
              </div>
              <h4 className="title">
                <p>Explore</p>
              </h4>
              <p className="description">
                You will have the opptunities to exploring others' schedule, and
                making your life different!
              </p>
            </div>

            <div className="icon-box" data-aos="zoom-in" data-aos-delay="300">
              <div className="icon">
                <GroupsIcon />
              </div>
              <h4 className="title">
                <p>Meet</p>
              </h4>
              <p className="description">
                You will able to meet a new friend who might have similar goal
                from the schedule, and be your soul-mate!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
