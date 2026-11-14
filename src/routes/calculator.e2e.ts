import { expect, test } from '@playwright/test';

const BASE = process.env.BASE_PATH || '';

function createSyntheticBinaryStlBuffer(
	dx: number,
	dy: number,
	dz: number,
	headerText = 'MetalProm39 Test Binary STL'
): Buffer {
	const triangleCount = 12;
	const buf = Buffer.alloc(84 + triangleCount * 50);

	// 80 bytes header
	buf.write(headerText, 0, Math.min(80, Buffer.byteLength(headerText)), 'ascii');

	// 4 bytes triangle count (Uint32 LE)
	buf.writeUInt32LE(triangleCount, 80);

	const v = [
		[0, 0, 0],
		[dx, 0, 0],
		[dx, dy, 0],
		[0, dy, 0],
		[0, 0, dz],
		[dx, 0, dz],
		[dx, dy, dz],
		[0, dy, dz]
	];

	const triangles = [
		[v[0], v[2], v[1]],
		[v[0], v[3], v[2]],
		[v[4], v[5], v[6]],
		[v[4], v[6], v[7]],
		[v[0], v[1], v[5]],
		[v[0], v[5], v[4]],
		[v[2], v[3], v[7]],
		[v[2], v[7], v[6]],
		[v[0], v[4], v[7]],
		[v[0], v[7], v[3]],
		[v[1], v[2], v[6]],
		[v[1], v[6], v[5]]
	];

	let offset = 84;
	for (const tri of triangles) {
		// Normal (0, 0, 0)
		buf.writeFloatLE(0, offset);
		buf.writeFloatLE(0, offset + 4);
		buf.writeFloatLE(0, offset + 8);
		offset += 12;

		// 3 vertices
		for (const p of tri) {
			buf.writeFloatLE(p[0], offset);
			buf.writeFloatLE(p[1], offset + 4);
			buf.writeFloatLE(p[2], offset + 8);
			offset += 12;
		}

		// 2 bytes attribute byte count
		buf.writeUInt16LE(0, offset);
		offset += 2;
	}

	return buf;
}

test.describe('CNC Cost Calculator Interactive Component', () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			try {
				localStorage.setItem('mp39_cookie_consent_v1', 'accepted');
			} catch {}
		});
		await page.goto(`${BASE}/`);
	});

	test('renders calculator with default turning operation and inputs', async ({ page }) => {
		const calcSection = page.locator('#calculator-section');
		await expect(calcSection).toBeVisible();
		await expect(
			calcSection.locator('h2')
		).toBeVisible();

		// Check operations are rendered inside calculator section
		await expect(calcSection.getByText('Токарная ЧПУ')).toBeVisible();
		await expect(calcSection.getByText('Фрезерная 3-оси')).toBeVisible();
	});

	test('shows Minimum Order Value warning when batch size is small', async ({ page }) => {
		const qtyInput = page.locator('#calculator-section input[type="number"][min="1"][max="5000"]');
		await qtyInput.fill('1');

		// The 5,000 RUB MOV alert card should be rendered
		const movAlert = page.locator('[data-testid="mov-alert"]');
		await expect(movAlert).toBeVisible();
		await expect(movAlert).toContainText('5 000');
	});

	test('updates calculation when toggling own material', async ({ page }) => {
		// Set batch quantity to 20 to avoid MOV clamp
		const qtyInput = page.locator('#calculator-section input[type="number"][min="1"][max="5000"]');
		await qtyInput.fill('20');

		// Get initial total price
		const priceEl = page.locator('[data-testid="total-price"]');
		await expect(priceEl).toBeVisible();
		const initialPriceText = await priceEl.innerText();

		// Toggle "Материал заказчика" switch
		const ownMaterialSwitch = page.locator('[data-testid="own-material-checkbox"]');
		await ownMaterialSwitch.click();

		// Price should update and decrease because material is provided by customer
		await expect(priceEl).not.toHaveText(initialPriceText);

		// Check breakdown shows "Давальческий (0 ₽)"
		await expect(page.getByText('Давальческий (0 ₽)')).toBeVisible();
	});

	test('parses uploaded binary STL and synchronizes dimensions with turning operation', async ({
		page
	}) => {
		// Generate synthetic cylinder-like STL: length 180mm, width 40mm, height 40mm
		const binaryBuffer = createSyntheticBinaryStlBuffer(180, 40, 40);

		const fileInput = page.locator('input[data-testid="cad-file-input"]');
		await fileInput.setInputFiles({
			name: 'turning_shaft_d40_l180.stl',
			mimeType: 'model/stl',
			buffer: binaryBuffer
		});

		// Info card should appear with model details
		const infoCard = page.locator('[data-testid="cad-info-card"]');
		await expect(infoCard).toBeVisible();
		await expect(infoCard).toContainText('turning_shaft_d40_l180.stl');
		await expect(infoCard).toContainText('STL BINARY');
		await expect(infoCard).toContainText('Распознано тело вращения');

		// Inputs should be synchronized to 180mm length and 40mm diameter
		const lengthInput = page.locator('#dim-length');
		const widthInput = page.locator('#dim-width');
		await expect(lengthInput).toHaveValue('180');
		await expect(widthInput).toHaveValue('40');

		// Clear button should dismiss info card
		const clearBtn = page.locator('[data-testid="cad-clear-btn"]');
		await clearBtn.click();
		await expect(infoCard).not.toBeVisible();
	});

	test('displays error alert when invalid CAD file is uploaded', async ({ page }) => {
		const invalidBuffer = Buffer.from('corrupted non-cad binary payload with no header');

		const fileInput = page.locator('input[data-testid="cad-file-input"]');
		await fileInput.setInputFiles({
			name: 'corrupted_file.stl',
			mimeType: 'model/stl',
			buffer: invalidBuffer
		});

		const errorAlert = page.locator('[data-testid="cad-error-alert"]');
		await expect(errorAlert).toBeVisible();
		await expect(errorAlert).toContainText('Ошибка CAD');
	});

	test("opens modal and displays production capacity notice on mobile viewport", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto(`${BASE}/`);

		const submitBtn = page.locator("button:has-text(\"Отправить спецификацию на расчет\")");
		await submitBtn.scrollIntoViewIfNeeded();
		await submitBtn.click();

		const modal = page.locator("[role=\"dialog\"]");
		await expect(modal).toBeVisible();

		const modalBox = await modal.boundingBox();
		expect(modalBox).not.toBeNull();
		expect(modalBox!.width).toBeGreaterThanOrEqual(300);

		const modalCard = modal.locator("h3:has-text(\"Спецификация партии зафиксирована\")");
		await expect(modalCard).toBeVisible();

		const closeBtn = modal.locator("button[aria-label=\"Закрыть модальное окно\"]");
		await closeBtn.click();
		await expect(modal).not.toBeVisible();
	});

});
