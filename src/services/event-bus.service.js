function createEventEmitter() {
  const listenersMap = {};
  window.mapmap = listenersMap;
  return {
    on(evName, listener) {
      listenersMap[evName] = listenersMap[evName]
        ? [...listenersMap[evName], listener]
        : [listener];
      return () => {
        listenersMap[evName] = listenersMap[evName].filter(
          (func) => func !== listener
        );
      };
    },
    emit(evName, data) {
      if (!listenersMap[evName]) return;
      listenersMap[evName].forEach((listener) => listener(data));
    },
  };
}

export const eventBusService = createEventEmitter();


export function showUserMsg(msg) {
  eventBusService.emit("show-user-msg", msg);
}

export function emailSentMsg(id) {
  showUserMsg({
    txt: "Email sent!",
    type: "success",
    emailId: id,
    actions: [
      {
        label: "View message",
      },
      {
        label: "Cancel sending",
      },
    ],
  });
}

export function showErrorMsg() {
  showUserMsg({
    txt: "You must indicate at least one recipient.",
    type: "error",
  });
}
