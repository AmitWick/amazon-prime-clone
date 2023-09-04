/* eslint-disable no-prototype-builtins */
export const combineObjects = (...objects) => {
  const newObject = {};

  for (const obj of objects) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!newObject.hasOwnProperty(key)) {
          newObject[key] = obj[key];
        } else if (newObject[key] !== obj[key]) {
          // Handle case where there's a conflicting key with different values
          // For simplicity, you might choose to ignore or handle this case differently
        }
      }
    }
  }

  return newObject;
};

export const runtimeFormated = (runtime) => {
  const movieHour = Math.floor(runtime / 60);
  const movieMinute = runtime % 60;

  return `${movieHour}h ${movieMinute}min`;
};

export const dateFormated = (dateStr) => {
  return dateStr.split("-").reverse().join("-");
};
