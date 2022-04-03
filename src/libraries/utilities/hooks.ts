import React from "react";

type AsyncState<DataType> =
  | {
      status: "pending";
      data: null;
      error: null;
    }
  | {
      status: "idle" | "resolved";
      data: DataType;
      error: null;
    }
  | {
      status: "rejected";
      data?: null;
      error: Error;
    };

type AsyncAction<DataType> =
  | { type: "pending" }
  | { type: "resolved"; data: DataType }
  | { type: "rejected"; error: Error };

function asyncReducer<DataType>(
  state: AsyncState<DataType>,
  action: AsyncAction<DataType>,
): AsyncState<DataType> {
  switch (action.type) {
    case "pending": {
      return { status: "pending" as const, data: null, error: null };
    }
    case "resolved": {
      return { status: "resolved" as const, data: action.data, error: null };
    }
    case "rejected": {
      return { status: "rejected" as const, data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
    }
  }
}

function useSafeDispatch<Dispatch extends (...args: any) => any>(
  dispatch: Dispatch,
) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (...args: Parameters<Dispatch>) => {
      if (mounted.current) {
        dispatch(...args);
      }
    },
    [dispatch],
  );
}

export function useAsync<DataType>(initialState?: AsyncState<DataType>) {
  const [state, unsafeDispatch] = React.useReducer<
    React.Reducer<AsyncState<DataType>, AsyncAction<DataType>>
  >(asyncReducer, { status: "idle", data: null, error: null, ...initialState });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = React.useCallback(
    (promise: Promise<DataType>) => {
      dispatch({ type: "pending" });
      promise.then(
        (d: DataType) => {
          dispatch({ type: "resolved", data: d });
        },
        (e: Error) => {
          dispatch({ type: "rejected", error: e });
        },
      );
    },
    [dispatch],
  );

  const setData = React.useCallback(
    (d: DataType) => dispatch({ type: "resolved", data: d }),
    [dispatch],
  );

  const setError = React.useCallback(
    (e: Error) => dispatch({ type: "rejected", error: e }),
    [dispatch],
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",
    setData,
    setError,
    error,
    status,
    data,
    run,
  };
}
