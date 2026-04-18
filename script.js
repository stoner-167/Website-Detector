let previousContent = "";

// Function to simulate checking website
async function checkWebsite() {
    const urlInput = document.getElementById("urlInput").value.trim();
    const result = document.getElementById("result");

    if (urlInput === "") {
        result.innerText = "❌ Please enter a URL";
        return;
    }

    // Add https if missing (simple fix)
    let url = urlInput;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    result.innerText = "⏳ Checking...";

    try {
        // Using public API to fetch content (simulated)
        const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(url));
        const data = await response.json();

        const newContent = data.contents;

        if (previousContent && previousContent !== newContent) {
            result.innerText = "⚠️ Website content changed!";
        } else {
            result.innerText = "✅ No change detected";
        }

        previousContent = newContent;

    } catch (error) {
        result.innerText = "⚠️ Error fetching website";
    }
}