/**
 * 화면에서는 이 파일만 import하면 된다.
 * 예: import { travelApi } from './api';
 */

export {
  apiClient,
  ApiClientError,
  createApiClient,
  isMockModeEnabled,
  getAccessToken,
  saveAccessToken,
  removeAccessToken,
} from "./apiClient";

export {
  login,
  logout,
  isLoggedIn,
} from "./authApi";

export {
  locationApi,
  createLocationApi,
} from "./locationApi";

export {
  routingApi,
  createRoutingApi,
} from "./routingApi";

export {
  journeyApi,
  createJourneyApi,
} from "./journeyApi";

export {
  contentApi,
  createContentApi,
} from "./contentApi";

export {
  bookingApi,
  createBookingApi,
} from "./bookingApi";

export {
  costApi,
  createCostApi,
  calculateMockCostEstimate,
} from "./costApi";

export {
  fuelApi,
  createFuelApi,
} from "./fuelApi";

export {
  API_ENDPOINTS,
  API_SOURCE_LABELS,
} from "./contracts";

import { locationApi } from "./locationApi";
import { routingApi } from "./routingApi";
import { journeyApi } from "./journeyApi";
import { contentApi } from "./contentApi";
import { bookingApi } from "./bookingApi";
import { costApi } from "./costApi";
import { fuelApi } from "./fuelApi";

export const travelApi = Object.freeze({
  locations: locationApi,
  routing: routingApi,
  journey: journeyApi,
  content: contentApi,
  booking: bookingApi,
  costs: costApi,
  fuel: fuelApi,
});