import React from "react";
import LeafletStoreLocator from "./LeafletStoreLocator";

/**
 * PUBLIC_INTERFACE
 * GoogleMapsStoreLocator: Legacy alias, now renders LeafletStoreLocator.
 * This file is retained only for backward compatibility.
 */
export default function GoogleMapsStoreLocator(props) {
  return <LeafletStoreLocator {...props} />;
}
