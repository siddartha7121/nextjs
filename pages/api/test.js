import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  try {
    console.log("Launching Puppeteer...");

    // Launch Puppeteer with --no-sandbox and --disable-setuid-sandbox flags
    const browser = await puppeteer.launch({
      headless: true, 
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // You can replace this URL with any website you want to scrape
    await page.goto('https://siddartha7121.github.io/portfolio/');  // Replace with the URL you want to scrape

    const htmlContent = await page.content();
    await browser.close();

    res.status(200).json({ html: htmlContent });
  } catch (error) {
    console.error('Error with Puppeteer:', error);
    res.status(500).json({ error: 'Error fetching HTML' });
  }
}
