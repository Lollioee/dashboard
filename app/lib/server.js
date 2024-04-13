import createSubscriber from "pg-listen"

// Accepts the same connection config object that the "pg" package would take
const subscriber = createSubscriber({ connectionString: "postgres://default:Hjm8wkGobKi9@ep-shiny-limit-a4bc88cm.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require" })

subscriber.notifications.on("my-channel", (payload) => {
  // Payload as passed to subscriber.notify() (see below)
  console.log("Received notification in 'my-channel':", payload)
})

subscriber.events.on("error", (error) => {
  console.error("Fatal database connection error:", error)
  process.exit(1)
})

process.on("exit", () => {
  subscriber.close()
})

export async function connect () {
  await subscriber.connect()
  await subscriber.listenTo("my-channel")
}

export async function sendSampleMessage () {
  await subscriber.notify("my-channel", {
    greeting: "Hey, buddy.",
    timestamp: Date.now()
  })
}