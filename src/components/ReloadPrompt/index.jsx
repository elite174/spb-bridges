import { Show, batch } from "solid-js";
import { useRegisterSW } from "virtual:pwa-register/solid";

import styles from "./ReloadPrompt.module.css";

export const ReloadPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      console.log(`SW Registered: ${registration}`);
    },
    onRegisterError(error) {
      console.error(`SW registration error ${error}`);
    },
  });

  const close = () =>
    batch(() => {
      setOfflineReady(false);
      setNeedRefresh(false);
    });

  return (
    <Show when={offlineReady() || needRefresh()}>
      <section class={styles.Toast}>
        <p class={styles.message}>
          <Show
            fallback={"Доступно обновление, установить?"}
            when={offlineReady()}
          >
            Приложение готово работать в offline
          </Show>
        </p>
        <div class={styles.row}>
          <Show when={needRefresh()}>
            <button
              class={styles.button}
              onClick={() => updateServiceWorker(true)}
            >
              Обновить
            </button>
          </Show>
          <button class={styles.button} onClick={() => close()}>
            Закрыть
          </button>
        </div>
      </section>
    </Show>
  );
};
