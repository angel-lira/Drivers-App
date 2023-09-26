const initialState = {
  allDrivers: [],
  allTeams: [],
  filteredDrivers: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DRIVERS":
      return {
        ...state,
        allDrivers: action.payload,
        filteredDrivers: action.payload,
        error: null,
      };
    case "GET_TEAMS":
      return {
        ...state,
        allTeams: action.payload,
        error: null,
      };
    case "SEARCH_DRIVERS":
      return {
        ...state,
        filteredDrivers: action.payload,
        error: null,
      };
    case "ORDER":
      if (action.payload !== "disabled") {
        let sortedDrivers;

        if (action.payload === "a") {
          sortedDrivers = [...state.filteredDrivers].sort((a, b) =>
            a.forename.localeCompare(b.forename)
          );
        } else if (action.payload === "d") {
          sortedDrivers = [...state.filteredDrivers].sort((a, b) =>
            b.forename.localeCompare(a.forename)
          );
        } else if (action.payload === "dobA") {
          sortedDrivers = [...state.filteredDrivers].sort((a, b) => {
            const dateA = new Date(a.dob);
            const dateB = new Date(b.dob);
            return dateA - dateB;
          });
        } else if (action.payload === "dobB") {
          sortedDrivers = [...state.filteredDrivers].sort((a, b) => {
            const dateA = new Date(a.dob);
            const dateB = new Date(b.dob);
            return dateB - dateA;
          });
        }

        return {
          ...state,
          filteredDrivers: sortedDrivers,
          error: null,
        };
      }
      return {
        ...state,
      };
    case "FILTER_ORIGIN":
      if (action.payload !== "disabled") {
        let filterOrigin;
        let message;

        if (action.payload === "api") {
          filterOrigin = state.filteredDrivers.filter(
            (driver) => !("createInDb" in driver)
          );
          message = "Api";
        } else if (action.payload === "db") {
          filterOrigin = state.filteredDrivers.filter(
            (driver) => "createInDb" in driver
          );
          message = "Database";
        }

        if (!filterOrigin || filterOrigin.length === 0) {
          return { ...state, error: `No existe driver en la ${message} ` };
        }

        return {
          ...state,
          filteredDrivers: filterOrigin,
          error: null,
        };
      }
      return {
        ...state,
      };
    case "FILTER_TEAMS":
      if (action.payload !== "disabled") {
        const filteredTeam = state.filteredDrivers.filter((obj) => {
          const teams =
            obj.teams && obj.teams.split(",").map((str) => str.trim());
          return teams && teams.includes(action.payload);
        });
        if (!filteredTeam || filteredTeam.length === 0) {
          return { ...state, error: "No existe drivers con este Team" };
        }

        return {
          ...state,
          filteredDrivers: filteredTeam,
          error: null,
        };
      }
      return {
        ...state,
      };
    case "RESET":
      return {
        ...state,
        filteredDrivers: [...state.allDrivers],
        error: null,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "RESET_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return { ...state };
  }
};

export default reducer;
