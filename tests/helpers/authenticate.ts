import { getOwner } from "@ember/application";

type Owner = ReturnType<typeof getOwner>;

export async function authenticate(owner: Owner): Promise<void> {
  await owner
    .lookup("service:session")
    .authenticate("authenticator:oauth2", "test@test.com", "test");
}

export async function invalidate(owner: Owner): Promise<void> {
  await owner.lookup("service:session").invalidate();
}
