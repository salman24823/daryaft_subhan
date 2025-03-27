'use client';

import TawkMessengerReactUmd from "@tawk.to/tawk-messenger-react";

// @ts-ignore

const TawkChat = () => {
  return (
    <TawkMessengerReactUmd
      propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}
      widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}
    />
  );
};

export default TawkChat;