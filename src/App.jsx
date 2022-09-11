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
import { timeConfig } from "./config";

import styles from "./App.module.css";

const App = () => {
  const [currentTime, setCurrentTime] = createSignal(new Date());

  const currentHours = createMemo(() => currentTime().getHours());
  const currentMinutes = createMemo(() => currentTime().getMinutes());

  createEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

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
            <th>Мост</th>
            <th>График разводки</th>
            <th>Время до разводки</th>
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
                  <td>
                    <a
                      class={styles.name}
                      classList={{
                        [styles.opened]: !isClosed(),
                        [styles.closed]: isClosed(),
                      }}
                      href={item.link}
                      target="_blank"
                    >
                      {item.name}
                    </a>
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
