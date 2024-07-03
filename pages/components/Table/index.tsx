import s from "./table.module.scss";
import { useState, useEffect } from "react";
import _ from "lodash";
import Button from "../Button";
import Image from "next/image";
import { TableProps } from "../../../utils/type-definitions";

const Table = ({ data, pageCallback, showDetailCallback }: TableProps) => {
  const [columnTitles, setColumnTitles] = useState<string[]>();
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleColumns = () => {
    if (data?.results[0]) {
      const newColumns = Object.keys(data.results[0]);
      setColumnTitles(newColumns);
    }
  };

  const handleRows = () => {
    const newRows = data?.results.map((item) => {
      return Object.values(item);
    });
    setRowData(newRows);
  };

  const handleCurrentPage = () => {
    const newPage = data?.info.prev ? data?.info.prev + 1 : data?.info.next - 1;
    setCurrentPage(Math.abs(newPage));
  };

  const handleItemFormatting = (item) => {
    if (typeof item !== "string") {
      return (
        <Button
          label="+"
          size={"small"}
          onClick={() => {
            showDetailCallback(item);
          }}
        />
      );
    } else if (item.includes("https://")) {
      return (
        <Image
          src={item}
          alt={"Image from rick and morty api"}
          width={20}
          height={20}
        />
      );
    } else {
      return (
        <p>{`${item.slice(0, 20).trim()}${item.length > 19 ? "..." : ""}`}</p>
      );
    }
  };

  useEffect(() => {
    if (data) {
      handleColumns();
      handleRows();
      handleCurrentPage();
    }
  }, [data]);

  if (data?.results.length === 0)
    return (
      <div className={s.sorryContainer}>
        <p>Sorry, no squanches for that request!</p>
      </div>
    );

  return (
    <div className={s.tableContainer}>
      <table>
        <thead>
          <tr className={s.tableHeader}>
            {columnTitles?.map((column) => {
              return (
                <td key={column} className={s.columnHeader}>
                  {_.startCase(column)}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody className={s.tableRows}>
          {rowData &&
            rowData.map((row: any, index) => {
              return (
                <tr key={`row-${index}`} className={s.tableRow}>
                  {row.map((item, index) => {
                    const formattedItem = handleItemFormatting(item);
                    return (
                      <td
                        key={`item-${index}`}
                        className={`${s.tableItem} ${
                          index === row.length - 1 ? s.last : ""
                        }`}
                      >
                        {formattedItem}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className={s.tableFooter}>
        <p>
          Page {currentPage}{" "}
          {data?.info.pages && `of ${data?.info.pages} pages`}
        </p>
        <div className={s.buttonContainer}>
          <Button
            label={"Previous"}
            isDisabled={!data?.info.prev}
            onClick={() => pageCallback(data?.info.prev)}
          />
          <Button
            label={"Next"}
            isDisabled={!data?.info.next}
            onClick={() => pageCallback(data?.info.next)}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
