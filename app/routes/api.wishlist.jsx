import { json } from "@remix-run/react";

import { Resolver } from "dns";

export async function loader() {
  return json({
    ok: true,
    message: "respons from api",
  });
}

export async function action({ request }) {
  const method = request.method;
  switch (method) {
    case "POST":
      return json({ message: "sucess", method: "post" });

    case "PUT":
      return json({ message: "sucess", method: "put" });

    default:
      return new Resolver("Method not allowed", { status: 405 });
      break;
  }
}
