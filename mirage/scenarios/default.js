export default function (server) {
  server.create("user", { email: "test@test.com" });

  // server.createList("question", 51); // uncomment to play with pagination
}
