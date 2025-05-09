import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  useBreakpoints,
  InlineGrid,
  TextField,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useState } from "react";
import db from "../db.server";

// --- Loader returns default user data ---
export async function loader() {
  let settings = await db.settings.findFirst();
  console.log(settings);
  return json(settings);
}

// --- Action handles submitted data ---
export async function action({ request }) {
  let settings = await request.formData();
  console.log(settings);
  settings = Object.fromEntries(settings);

  // update database
  await db.settings.upsert({
    where: { id: "1" },
    update: {
      id: "1",
      name: settings.name,
      description: settings.description,
    },
    create: {
      id: "1",
      name: settings.name,
      description: settings.description,
    },
  });

  return json(settings);
}

export default function SettingsPage() {
  const settings = useLoaderData();

  const [formState, setFormState] = useState(settings);

  return (
    <Page>
      <ui-title-bar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  label="App name"
                  name="name"
                  value={formState?.name}
                  onChange={(value) =>
                    setFormState({ ...formState, name: value })
                  }
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formState?.description}
                  onChange={(value) =>
                    setFormState({ ...formState, description: value })
                  }
                />

                <Button submit={true}>Save </Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}
