// @ts-nocheck
import {
  strReverse,
  strToLower,
  strToUpper,
  strRandomize,
  strInvertCase,
} from "./modules/stats";

import {
  getMaxIndex,
  getMaxElement,
  getMinIndex,
  getMinElement,
  getMedianIndex,
  getMedianElement,
  getAverageValue,
} from "./modules/str-utils";

import * as dateWizard from "./modules/date-wizard";
import "./declarations/date-wizard";

dateWizard(new Date(), "{date}.{month}.{year} {hours}:{minutes}");
