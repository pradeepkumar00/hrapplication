import { UtilService } from "./util.service";
import { AppService } from "./app.service";
import { EventEmitterService } from "./event-emitter.service";
import { AuthService } from "./auth.service";
import { AnalyticsService } from "./analytics.service";
import { ProfileService } from "./profile.service";
import { ClientLogsService } from "./client-logs.service";
import { RestService } from "./rest.service";
import { ThemeService } from "./theme.service";
export * from "./util.service";
export * from "./app.service";
export * from "./event-emitter.service";
export * from "./auth.service";
export * from "./analytics.service";
export * from "./profile.service";
export * from "./client-logs.service";
export * from "./rest.service";
export * from "./theme.service";

export const services = [
  AppService,
  EventEmitterService,
  UtilService,
  AuthService,
  AnalyticsService,
  ProfileService,
  ClientLogsService,
  RestService,
  ThemeService
];
