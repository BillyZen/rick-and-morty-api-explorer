import { TableViews, DetailViewProps } from "@/utils/type-definitions";
import Button from "../Button";
import s from "./detail-view.module.scss";
import { useEffect, useState } from "react";
import _ from "lodash";
import Image from "next/image";

const DetailView = ({
  data,
  searchCallback,
  tableViewCallback,
  setIsDetailView,
}: DetailViewProps) => {
  const [formattedData, setFormattedData] = useState([]);

  const handleDetailClick = (value: {
    __typename: TableViews;
    itemName: string;
  }) => {
    searchCallback(value.itemName);
    tableViewCallback(value.__typename, value.itemName);
    setIsDetailView(false);
  };

  const handleDataFormatting = () => {
    const newData: any = [];
    if (Array.isArray(data) && data.length > 0) {
      data.map((item) => {
        for (const key in item) {
          newData.push({ [key]: item[key] });
        }
      });
    } else {
      for (const key in data) {
        newData.push({ [key]: data[key] });
      }
    }

    setFormattedData(newData);
  };

  const handleFormattedItem = (item) => {
    for (const key in item) {
      if (typeof item[key] === "string")
        return (
          <p>
            <span>{_.startCase(key)}</span>:{" "}
            {item[key].includes("https://") ? (
              <Image src={item[key]} alt="item image" width={40} height={40} />
            ) : (
              <span>{item[key]}</span>
            )}
          </p>
        );
      else {
        for (const key in item) {
          return (
            <div className={s.detailListContainer}>
              <p>{_.startCase(key)}:</p>
              {item[key] &&
                item[key].length > 0 &&
                item[key]?.map((value, index) => {
                  return (
                    <span
                      key={`value-${index}`}
                      onClick={() =>
                        handleDetailClick({
                          __typename: `${_.lowerCase(
                            value.__typename
                          )}s` as TableViews,
                          itemName: value.name,
                        })
                      }
                      className={s.detailItem}
                    >
                      {index > 0 && ", "}
                      {value.name}
                    </span>
                  );
                })}
            </div>
          );
        }
      }
    }
  };

  useEffect(() => {
    if (data) {
      handleDataFormatting();
    }
  }, [data]);

  return (
    <div className={s.detailViewContainer}>
      <Button
        label={"Back"}
        onClick={() => {
          setIsDetailView(false);
        }}
      />
      <div className={s.extraDetailContainer}>
        {formattedData.length > 0 &&
          formattedData?.map((item, index) => {
            const formattedItem = handleFormattedItem(item);
            return <div key={`formatted-${index}`}>{formattedItem}</div>;
          })}
      </div>
    </div>
  );
};

export default DetailView;
