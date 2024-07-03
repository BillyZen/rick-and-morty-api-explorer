import s from "./view-switch.module.scss";
import _ from "lodash";
import { TableViews } from "../../../utils/type-definitions";

const ViewSwitch = ({
  headings,
  viewSwitchCallback,
  activeView,
}: {
  headings: TableViews[];
  viewSwitchCallback: (value: TableViews) => void;
  activeView: TableViews;
}) => {
  return (
    <div className={s.viewSwitchContainer}>
      {headings?.map((heading) => {
        return (
          <p
            key={heading}
            className={`${s.heading} ${activeView === heading ? s.active : ""}`}
            onClick={() => {
              viewSwitchCallback(heading);
            }}
          >
            {_.capitalize(heading)}
          </p>
        );
      })}
    </div>
  );
};

export default ViewSwitch;
