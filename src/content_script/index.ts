import {
  DevtoolsExchangeOutgoingMessage,
  DevtoolsExchangeOutgoingEventType,
  DevtoolsExchangeIncomingEventType,
} from "@urql/devtools";
import { ContentScriptConnectionName } from "../types";
import { debug } from "../util";

/** Connection to background.js */
let connection: chrome.runtime.Port | undefined;

// Listen for init message from exchange
window.addEventListener("message", ({ data, isTrusted }) => {
  if (!isTrusted || data?.type !== DevtoolsExchangeOutgoingEventType) {
    return;
  }

  const message = data.message as DevtoolsExchangeOutgoingMessage;

  debug("Exchange Message: ", data);
  if (message.type === "init") {
    connection = chrome.runtime.connect({ name: ContentScriptConnectionName });
    connection.onMessage.addListener(handleMessage);
    connection.onDisconnect.addListener(handleDisconnect);
  }

  if (connection === undefined) {
    return console.warn("Unable to send message to Urql Devtools extension");
  }

  connection.postMessage(message);
});

/** Handle message from background script. */
const handleMessage = (message: DevtoolsExchangeOutgoingMessage) => {
  debug("Background Message: ", message);
  window.postMessage(
    {
      type: DevtoolsExchangeIncomingEventType,
      message,
    },
    window.location.origin
  );
};

/** Handle disconnect from background script. */
const handleDisconnect = () => {
  connection = undefined;
};
