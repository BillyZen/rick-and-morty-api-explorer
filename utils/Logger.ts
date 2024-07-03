import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import { User } from "@prisma/client";

const createLogger = (level: string, filename: string) => {
  if (process.env.NODE_ENV !== "development") {
    return {
      log: () => {},
    };
  }
  return winston.createLogger({
    level,
    silent: false,
    transports: [
      new DailyRotateFile({
        filename,
        datePattern: "YYYY-MM-DD-HH",
        maxSize: "20m",
        maxFiles: "7d",
        format: winston.format.combine(
          winston.format.errors({ stack: true }),
          winston.format.timestamp({
            format: new Date().toLocaleString("en-GB", {
              timeZone: "Europe/London",
            }),
          }),
          winston.format.ms(),
          winston.format.printf((info) => {
            return `${level.toUpperCase()}: ${info.message}`;
          })
        ),
      }),
    ],
  });
};

export const getLogger = (service: string, user?: User) => {
  let level = "error";
  let filename;

  if (user) {
    filename = path.join("Logs", `%DATE%-${user.username}.log`);
    // can add a user log level at some point if turns out to be useful for debugging
  } else {
    filename = path.join("Logs", `%DATE%-${service}.log`);
    if (process.env.LOG_LEVEL) {
      level = process.env.LOG_LEVEL;
    }
  }

  return createLogger(level, filename);
};

export default getLogger;
