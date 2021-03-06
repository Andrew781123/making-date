import { AppBar, makeStyles, Theme } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { TabPanel } from "@material-ui/lab";
import React, { Fragment } from "react";
import { CommonAvailableCategory, TimeAvailable } from "../../../../../types";
import { CommonAvailableCategoryGroup } from "./CommonAvailableCategoryGroup";
import { CategoryTitle } from "../../../pages/dashboard/CategoryTitle";

interface CommonAvailableTabsProps {
  participantList: string[];
  commonAvailableCategory: CommonAvailableCategory;
  commonAvailable: TimeAvailable;
  participantCount: number;
}

const useTabBarStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "#387DAB"
  },
  indicator: {
    backgroundColor: "#F7DC6A",
    height: 3.7
  },
  flexContainer: {
    justifyContent: "space-around"
  }
}));

const useTabIconStyles = makeStyles({
  root: {
    marginTop: 5,
    marginBottom: 5
  }
});

const useTabListStyle = makeStyles({
  root: {
    padding: 5,
    backgroundColor: "#92d3ff",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    minHeight: "100px"
  }
});

export const CommonAvailableTabs: React.FC<CommonAvailableTabsProps> = props => {
  const {
    participantList,
    commonAvailableCategory,
    commonAvailable,
    participantCount
  } = props;

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const categoryIndexes = [1, 2, 3, 4];

  const tabBarClass = useTabBarStyles();
  const tabListClass = useTabListStyle();
  const tabBarIconClass = useTabIconStyles();

  return (
    <>
      <TabContext value={value}>
        <AppBar position='static' color='default' className={tabBarClass.root}>
          <TabList
            centered={true}
            value={value}
            indicatorColor='primary'
            textColor='primary'
            aria-label='disabled tabs example'
            onChange={handleChange}
            classes={{
              indicator: tabBarClass.indicator,
              flexContainer: tabBarClass.flexContainer
            }}
          >
            {categoryIndexes.map(index => (
              <Tab
                key={index}
                icon={<CategoryTitle categoryType={index} />}
                value={index.toString()}
                classes={{ root: tabBarIconClass.root }}
              />
            ))}
          </TabList>
        </AppBar>

        {Object.keys(commonAvailableCategory).map((categoryIndex, i) => (
          <Fragment key={i}>
            <TabPanel value={(i + 1).toString()} className={tabListClass.root}>
              <CommonAvailableCategoryGroup
                participantList={participantList}
                category={commonAvailableCategory[+categoryIndex]}
                commonAvailable={commonAvailable}
                participantCount={participantCount}
                index={i + 1}
              />
            </TabPanel>
          </Fragment>
        ))}
      </TabContext>
    </>
  );
};
