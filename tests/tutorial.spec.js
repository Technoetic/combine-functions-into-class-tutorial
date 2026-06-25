import { expect, test } from "@playwright/test";

test("renders an interactive tutorial without code snippets", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Combine Functions into Class" })).toBeVisible();
  await expect(page.locator("pre, code")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "배달 앱" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("collects fragments and completes safety checks", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "거리 요금 거리와 시간을 함께 확인" }).click();
  await expect(page.getByText("1/4 조각")).toBeVisible();

  await page.getByRole("button", { name: "모으기" }).click();
  await expect(page.getByText("4/4 조각")).toBeVisible();

  await page.getByLabel("같은 데이터를 본다").check();
  await page.getByLabel("겉결과를 유지한다").check();
  await page.getByLabel("센터 이름이 자연스럽다").check();
  await expect(page.getByText("리팩토링 감각이 완성됐습니다")).toBeVisible();
});

test("keeps the learning workspace usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "음악 앱" }).click();
  await expect(page.getByText("플레이리스트 센터")).toBeVisible();
  await expect(page.getByRole("button", { name: "모으기" })).toBeVisible();
});
