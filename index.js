const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 開啟登入頁
  await page.goto('https://aternos.org/login/');

  // 輸入帳號密碼並登入 (請改成你的帳密)
  await page.type('#username', '你的帳號');
  await page.type('#password', '你的密碼');
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  // 進入伺服器頁面
  await page.goto('https://aternos.org/server/', { waitUntil: 'networkidle0' });

  // 找到啟動按鈕，並點擊（要根據實際頁面調整）
  const startBtn = await page.$x("//button[contains(text(),'Start')]");
  if (startBtn.length > 0) {
    await startBtn[0].click();
    console.log('已點擊啟動按鈕');
  } else {
    console.log('找不到啟動按鈕');
  }

  await browser.close();
})();
