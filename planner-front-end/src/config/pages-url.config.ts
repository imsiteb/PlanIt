class DASHBOARD {
  private root = '/i'

  HOME = this.root
  TASKS = `${this.root}/tasks`
  HABITS = `${this.root}/habits`
  TIMER = `${this.root}/timer`
  TIME_BLOCKING = `${this.root}/time-blocking`
  SETTINGS = `${this.root}/settings`
  NOTE_LISTS = `${this.root}/note-list`
  NOTES = `${this.root}/note-list/:id`
}

export const DASHBOARD_PAGES = new DASHBOARD()