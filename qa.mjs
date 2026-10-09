// Temporary QA script: drives the app in a headless browser and reports results.
export default async function run(page, ui) {
  const report = {};

  // 1. Initial state — the app should prompt the user to search.
  report.initial = await ui.snapshot();

  // 2. Type a country name and submit.
  await ui.fill("@e1", "Japan");
  await ui.click("@e2");

  // 3. Wait for the country card to actually appear (not a fixed delay).
  try {
    await page.waitForSelector(".country-card", { timeout: 15000 });
  } catch {
    report.error = "country-card never appeared";
    report.afterSearch = await ui.snapshot();
    return report;
  }

  // 4. Read the rendered card text.
  report.card = await ui.text(".country-card");

  // 5. Empty state: search for nonsense and confirm the friendly message.
  await ui.fill("@e1", "zzzzzznotacountry");
  await ui.click("@e2");
  try {
    await page.waitForSelector(".state-message.empty", { timeout: 15000 });
    report.emptyState = await ui.text(".state-message.empty");
  } catch {
    report.emptyState = "EMPTY STATE DID NOT APPEAR";
  }

  return report;
}
