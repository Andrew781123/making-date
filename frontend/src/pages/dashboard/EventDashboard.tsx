import { Box, Button, Divider } from "@material-ui/core";
import React, { useContext, useEffect, useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { CommonAvailableCategoryGroup } from "../../components/shared/Dashboard/CommonAvailableCategoryGroup";
import { EventContext } from "../../context/event-context/EventProvider";
import { PageHeader } from "../../shared/conponents/PageHeader";
import { EventInfoBlock } from "../new-participant-form/EventInfoBlock";
import "./EventDashBoard.scss";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Alert from "@material-ui/lab/Alert";
import { CommonAvailableTabs } from "../../components/shared/Dashboard/CommonAvailableTabs";

interface routeProps {
  id: string;
}

interface EventDashboardProps extends RouteComponentProps<routeProps> {}

export const EventDashboard: React.FC<EventDashboardProps> = props => {
  const {
    match: {
      params: { id: eventId }
    },
    history
  } = props;

  const { event, loadingEvent, fetchEvent } = useContext(EventContext);
  const {
    commonAvailable,
    commonAvailableCategory,
    participants,
    info: { venue, organizer },
    periods,
    duration
  } = event;

  useEffect(() => {
    //update the commonAvailable if redirected from form
    if (!commonAvailable) {
      fetchEvent(eventId);
    }
    // eslint-disable-next-line
  }, []);

  const participantList = useMemo(() => {
    return participants.map(participantObj => {
      return participantObj.name;
    });
  }, [participants]);

  return (
    <div className='page_container'>
      <Alert
        severity='info'
        action={
          <Button
            color='inherit'
            size='small'
            onClick={() =>
              history.push({ pathname: `/events/${eventId}/new-participant` })
            }
          >
            Join event
          </Button>
        }
      >
        Not yet joined?
      </Alert>

      <PageHeader icon={<DashboardIcon />} headerText='Dashboard' />
      <EventInfoBlock
        loadingEvent={loadingEvent}
        eventInfo={{
          venue: venue.name,
          organizer: organizer,
          evnetPossibleDataAndTime: periods,
          participantCount: participants.length,
          eventDuration: duration
        }}
      />

      <Box my={5} />

      <h1 className='header'>Results</h1>
      <Divider />
      <Box mb={1.5} />
      {commonAvailable && commonAvailableCategory && (
        <CommonAvailableTabs
          participantList={participantList}
          commonAvailableCategory={commonAvailableCategory}
          commonAvailable={commonAvailable}
          participantCount={participants.length}
        />
      )}
    </div>
  );
};
