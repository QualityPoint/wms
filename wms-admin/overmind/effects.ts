export const effects = {
  storage: {
    saveState(state: any) {
      localStorage.setItem("appState", JSON.stringify(state));
    },
    loadState() {
      const raw = localStorage.getItem("appState");
      return raw ? JSON.parse(raw) : {};
    },
  }
}
