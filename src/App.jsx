import {
  For,
  createSignal,
  onCleanup,
  createEffect,
  createMemo,
} from "solid-js";

import { ReloadPrompt } from "./components/ReloadPrompt";

import {
  getTimeString,
  isBetweenIntervals,
  getClosestTimeForIntervals,
  formatTime,
} from "./utils";
import { timeConfig } from "./time-config";

import styles from "./App.module.css";

const testDate = new Date("20 December 2019 02:09:55");

const App = () => {
  const [currentTime, setCurrentTime] = createSignal(testDate);

  const currentHours = createMemo(() => currentTime().getHours());
  const currentMinutes = createMemo(() => currentTime().getMinutes());

  createEffect(() => {
    const timer = setInterval(
      () =>
        setCurrentTime(
          (date) => new Date(date.setSeconds(date.getSeconds() + 1))
        ),
      1000
    );

    onCleanup(() => clearInterval(timer));
  });

  return (
    <main class={styles.main}>
      <h1 class={styles.header}>График разводки мостов СПБ</h1>
      <p class={styles.currentTime}>
        Текущее время:{" "}
        <strong>
          <time>{currentTime().toLocaleTimeString()}</time>
        </strong>
      </p>
      <table class={styles.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>График развода</th>
            <th>Время до развода</th>
          </tr>
        </thead>
        <tbody>
          <For each={timeConfig}>
            {(item) => {
              const isClosed = createMemo(() =>
                isBetweenIntervals(
                  currentHours(),
                  currentMinutes(),
                  item.closed
                )
              );

              const closestTime = createMemo(() =>
                getClosestTimeForIntervals(
                  currentHours(),
                  currentMinutes(),
                  item.closed
                )
              );
              const isWarning = () =>
                closestTime().hours === 0 && closestTime().minutes < 30;

              return (
                <tr>
                  <td
                    classList={{
                      [styles.opened]: !isClosed(),
                      [styles.closed]: isClosed(),
                    }}
                  >
                    {item.name}
                  </td>
                  <td class={styles.time}>{getTimeString(item.closed)}</td>
                  <td>
                    <time classList={{ [styles.warning]: isWarning() }}>
                      {formatTime(closestTime())}
                    </time>
                  </td>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
      <ReloadPrompt />
    </main>
  );
};

export default App;